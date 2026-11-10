import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Guarded RAG AI Assistant for Medical Coding Officers Academy (MCOA)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sessionId, category = 'counselor', userEmail, userPhone } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const trimmedMsg = message.trim();
    const sessionKey = sessionId || `anon_${Date.now()}`;

    // 1. Check for Human Counselor Escalation triggers
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s-]{7,12}/;
    const wantsHumanWords = ['call me', 'talk to human', 'speak to counselor', 'phone me', 'contact person', 'admissions officer', 'whatsapp me'];
    const lowerMsg = trimmedMsg.toLowerCase();
    
    let isEscalated = false;
    let extractedPhone = userPhone || null;

    if (wantsHumanWords.some(w => lowerMsg.includes(w)) || (lowerMsg.includes('call') && phoneRegex.test(trimmedMsg))) {
      isEscalated = true;
      const match = trimmedMsg.match(phoneRegex);
      if (match && match[0].trim().length >= 10) {
        extractedPhone = match[0].trim();
      }
    }

    // 2. Query Knowledge Base using keyword retrieval
    const knowledgeItems = await prisma.aiKnowledgeItem.findMany({
      where: { isVerified: true }
    });

    const searchTokens = lowerMsg.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 2);
    
    // Score each knowledge item based on keyword & title overlap
    const scoredItems = knowledgeItems.map(item => {
      let score = 0;
      const itemKeywords = (item.keywords + ' ' + item.title + ' ' + item.category).toLowerCase();
      for (const token of searchTokens) {
        if (itemKeywords.includes(token)) score += 3;
        if (item.content.toLowerCase().includes(token)) score += 1;
      }
      return { item, score };
    }).sort((a, b) => b.score - a.score);

    const topMatches = scoredItems.filter(s => s.score > 0).slice(0, 2);

    let reply = '';
    const citations: string[] = [];

    // Synthesize response based on retrieved facts and guarded policies
    if (topMatches.length > 0) {
      const best = topMatches[0].item;
      citations.push(best.source);
      if (topMatches[1]) citations.push(topMatches[1].item.source);

      // Context-aware dynamic responses
      if (lowerMsg.includes('fee') || lowerMsg.includes('cost') || lowerMsg.includes('installment') || lowerMsg.includes('price')) {
        reply = `The MCOA 4-Month Advanced Medical Coding & AAPC CPC Preparation Program is priced at ₹45,000 (inclusive of 18% GST). We offer a 3-installment plan: Installment 1 (Down Payment upon joining): ₹15,000; Installment 2 (Month 1): ₹15,000; Installment 3 (Month 2): ₹15,000. All fees include official manuals, LMS simulator access, and placement assistance.`;
      } else if (lowerMsg.includes('campus') || lowerMsg.includes('branch') || lowerMsg.includes('chennai') || lowerMsg.includes('coimbatore') || lowerMsg.includes('location')) {
        reply = `MCOA operates 4 official campuses: Chennai Head Office (#70/1 200 Feet Radial Road, Pallikaranai), Perambalur (3rd Floor, Annai Hospital), Coimbatore (#17 Sangam Street, Sundarapuram), and Karaikudi (#52 5th Cross TT Nagar). We also offer live interactive online batches via Zoom and Google Meet. Central hotline: +91 8072020716.`;
      } else if (lowerMsg.includes('modifier 25') || lowerMsg.includes('modifier 59') || lowerMsg.includes('modifier')) {
        reply = `According to AMA CPT and CMS NCCI rules: Modifier 25 indicates a significant, separately identifiable Evaluation and Management (E&M) service on the same day as a minor procedure. Modifier 59 designates a distinct procedural service (different session, anatomical site, or separate lesion) on the same date.`;
      } else if (lowerMsg.includes('diabetes') || lowerMsg.includes('e11') || lowerMsg.includes('icd')) {
        reply = `Per 2026 ICD-10-CM guidelines (Sec I.C.4), category E11 requires coding the specific diabetic complication first (e.g., E11.22 for diabetic CKD), followed by the manifestation stage (e.g., N18.30 for CKD stage 3). Long-term insulin use is captured with Z79.4 as secondary.`;
      } else if (lowerMsg.includes('placement') || lowerMsg.includes('job') || lowerMsg.includes('salary') || lowerMsg.includes('company')) {
        reply = `MCOA offers dedicated placement assistance. Our graduates are recruited by corporate RCM leaders including Omega Healthcare, Access Healthcare, Episource, and AGS Health with starting packages ranging from ₹3.50 LPA to ₹5.20 LPA.`;
      } else {
        reply = `${best.content} [Reference: ${best.source}]`;
      }
    } else {
      reply = `Thank you for reaching out to Medical Coding Officers Academy (MCOA). We offer comprehensive training in AAPC CPC, AHIMA CCS, and Inpatient MS-DRG coding across our Chennai, Perambalur, Coimbatore, Karaikudi campuses and Live Online. How can I assist you with course syllabus, fee installments, or clinical coding guidelines?`;
      citations.push('MCOA Academic Directory 2026');
    }

    if (isEscalated) {
      reply += `\n\n📌 Notice: I have forwarded your inquiry to our Senior Admissions Counselor at the Head Office. A representative will contact you via WhatsApp/Phone at ${extractedPhone || 'your contact number'} within 15 minutes.`;
    }

    // 3. Log conversation to database for audit and transparency
    await prisma.aiConversation.create({
      data: {
        sessionId: sessionKey,
        role: 'user',
        content: trimmedMsg,
        category,
        userEmail: userEmail || null,
        userPhone: extractedPhone || null,
        escalatedToHuman: isEscalated
      }
    });

    const assistantRecord = await prisma.aiConversation.create({
      data: {
        sessionId: sessionKey,
        role: 'assistant',
        content: reply,
        category,
        citations: JSON.stringify(citations),
        escalatedToHuman: isEscalated
      }
    });

    return NextResponse.json({
      success: true,
      sessionId: sessionKey,
      reply,
      citations,
      escalatedToHuman: isEscalated,
      counselorHotline: '+91 8072020716',
      messageId: assistantRecord.id
    });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: 'Failed to process AI chat request', details: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const where = sessionId ? { sessionId } : {};
    const conversations = await prisma.aiConversation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return NextResponse.json({ success: true, count: conversations.length, conversations });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch conversations', details: error.message }, { status: 500 });
  }
}
