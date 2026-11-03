"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Download,
  Printer,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";

interface PaymentOrder {
  id: string;
  orderNumber: string;
  amount: number;
  status: string;
  installmentNumber: number;
  dueDate?: string;
  paidAt?: string;
  invoiceNumber?: string;
  paymentMethod?: string;
  notes?: string;
}

export default function StudentFeesPage() {
  const [orders, setOrders] = useState<PaymentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingOrderId, setPayingOrderId] = useState<string | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentOrder | null>(null);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string | null>(null);

  const loadStatement = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/payments/finance");
      const data = await res.json();
      if (data.success && data.recentTransactions) {
        setOrders(data.recentTransactions);
        const firstPaid = data.recentTransactions.find((o: any) => o.status === "Paid");
        if (firstPaid) setSelectedReceipt(firstPaid);
      }
    } catch (err) {
      console.error("Error loading statement:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatement();
  }, []);

  const totalFee = 45000;
  const totalPaid = orders
    .filter((o) => o.status === "Paid")
    .reduce((sum, o) => sum + o.amount, 0) || 15000;
  const balanceRemaining = totalFee - totalPaid;

  const handlePayInstallment = async (order: PaymentOrder) => {
    try {
      setPayingOrderId(order.id);
      // 1. Create Razorpay Order
      const res = await fetch("/api/payments/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          amount: order.amount,
          installmentNumber: order.installmentNumber,
        }),
      });
      const orderData = await res.json();

      if (!orderData.success) {
        alert(orderData.error || "Failed to initialize payment");
        setPayingOrderId(null);
        return;
      }

      // 2. Simulate or execute Razorpay Checkout
      const confirmPay = window.confirm(
        `[MCOA Razorpay Payment Gateway]\n\nAuthorize payment of ₹${order.amount.toLocaleString()} for Installment #${order.installmentNumber} via UPI / Netbanking / Debit Card?\n\nGateway Status: ${orderData.message}`
      );

      if (confirmPay) {
        // 3. Verify Payment
        const verifyRes = await fetch("/api/payments/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.id,
            razorpayOrderId: orderData.razorpayOrderId,
            razorpayPaymentId: `pay_${Date.now()}`,
            razorpaySignature: "simulated_verified_sig",
            paymentMethod: "UPI (Google Pay / PhonePe)",
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setPaymentSuccessMsg(
            `Payment Verified! Invoice #${verifyData.invoiceNumber} generated. WhatsApp receipt dispatched.`
          );
          await loadStatement();
        } else {
          alert("Payment verification failed");
        }
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Payment process error");
    } finally {
      setPayingOrderId(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-mcoa-amethyst font-montserrat">
            Finance & Accounts
          </span>
          <h1 className="text-2xl font-bold font-montserrat text-mcoa-midnight mt-0.5">
            Student Fee Statement & Razorpay Portal
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Installment schedule management, instant 1-click Razorpay fee payments, and tax-compliant official GST receipts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-midnight text-white hover:bg-mcoa-amethyst transition flex items-center space-x-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-mcoa-gold" />
            <span>Print Official Receipt</span>
          </button>
        </div>
      </div>

      {paymentSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{paymentSuccessMsg}</span>
          </div>
          <button
            onClick={() => setPaymentSuccessMsg(null)}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Financial Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-500 font-semibold uppercase">Total Program Fee</span>
          <div className="text-2xl font-bold text-mcoa-midnight font-montserrat mt-1">
            ₹{totalFee.toLocaleString()}
          </div>
          <div className="text-[11px] text-gray-400">Advanced Medical Coding (3 Installments)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs text-emerald-700 font-semibold uppercase">Total Amount Paid</span>
          <div className="text-2xl font-bold text-emerald-800 font-montserrat mt-1">
            ₹{totalPaid.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{Math.round((totalPaid / totalFee) * 100)}% Cleared to Date</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs text-amber-700 font-semibold uppercase">Remaining Balance</span>
          <div className="text-2xl font-bold text-amber-800 font-montserrat mt-1">
            ₹{balanceRemaining.toLocaleString()}
          </div>
          <div className="text-[11px] text-gray-500">
            {balanceRemaining > 0 ? "Installments active on schedule" : "Cleared in Full"}
          </div>
        </div>
      </div>

      {/* Installment Milestone Schedule */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-montserrat font-bold text-base text-mcoa-midnight">
              Installment Payment Schedule
            </h3>
            <p className="text-xs text-gray-500">
              Payments are verified securely via Razorpay with automated WhatsApp receipt confirmation.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-xs text-mcoa-amethyst font-semibold">
            <ShieldCheck className="w-4 h-4 text-mcoa-gold" />
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>

        <div className="space-y-3">
          {orders.map((order) => {
            const isPaid = order.status === "Paid";
            return (
              <div
                key={order.id}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                  isPaid
                    ? "border-emerald-200 bg-emerald-50/20"
                    : "border-gray-200 bg-white hover:border-mcoa-amethyst/40"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-montserrat font-bold text-xs text-mcoa-midnight">
                      Installment #{order.installmentNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isPaid
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {isPaid ? "PAID & VERIFIED" : "PENDING DUE"}
                    </span>
                    {order.invoiceNumber && (
                      <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        Invoice: {order.invoiceNumber}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">
                    {order.notes || "Tuition installment payment"}
                  </p>
                  <div className="text-[11px] text-gray-400 font-mono">
                    {isPaid ? (
                      <span>Paid on {order.paidAt ? new Date(order.paidAt).toLocaleDateString("en-IN") : "Oct 01, 2026"} via {order.paymentMethod || "UPI"}</span>
                    ) : (
                      <span>Due Date: {order.dueDate ? new Date(order.dueDate).toLocaleDateString("en-IN") : "Upcoming"}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center">
                  <div className="text-right">
                    <div className="font-montserrat font-bold text-base text-mcoa-midnight">
                      ₹{order.amount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-gray-400">INR Incl. GST</div>
                  </div>

                  {isPaid ? (
                    <button
                      onClick={() => setSelectedReceipt(order)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-700 hover:bg-gray-100 flex items-center space-x-1"
                    >
                      <span>View Receipt</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayInstallment(order)}
                      disabled={payingOrderId === order.id}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5 disabled:opacity-50"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{payingOrderId === order.id ? "Processing..." : "Pay via Razorpay"}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Tax Invoice / Receipt Card */}
      <div className="bg-white rounded-3xl border border-mcoa-gold/40 shadow-royal p-8 sm:p-10 max-w-3xl mx-auto space-y-6">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="bg-white p-2 rounded-lg">
            <Image
              src="/mcoa-logo.png"
              alt="MCOA Official Logo"
              width={200}
              height={55}
              className="object-contain h-10 w-auto"
            />
          </div>

          <div className="text-right text-xs">
            <div className="font-montserrat font-bold text-mcoa-midnight text-sm">
              OFFICIAL TUITION RECEIPT
            </div>
            <div className="font-mono text-gray-500">
              Receipt No: {selectedReceipt?.invoiceNumber || "MCOA-INV-2026-0082"}
            </div>
            <div className="text-gray-400">
              Date: {selectedReceipt?.paidAt ? new Date(selectedReceipt.paidAt).toLocaleDateString("en-IN") : "October 01, 2026"}
            </div>
          </div>
        </div>

        {/* Student and Institution Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-700">
          <div className="space-y-1">
            <span className="font-bold text-mcoa-midnight uppercase text-[10px] tracking-wider text-mcoa-amethyst">
              Student Details
            </span>
            <div className="font-bold text-sm text-mcoa-midnight">Sneha Ramachandran</div>
            <div>Student ID: <strong className="font-mono">MCOA-2026-CHN-0082</strong></div>
            <div>Phone: +91 98765 43210</div>
            <div>Program: Advanced Medical Coding Masterclass</div>
          </div>

          <div className="space-y-1 text-left sm:text-right">
            <span className="font-bold text-mcoa-midnight uppercase text-[10px] tracking-wider text-mcoa-amethyst">
              Campus Details
            </span>
            <div className="font-bold text-sm text-mcoa-midnight">
              MCOA Head Office — Chennai
            </div>
            <div>#70/1, 200 Feet Radial Road, Pallikaranai, Chennai - 600100</div>
            <div>GSTIN: <strong className="font-mono">33AABCM1234F1Z8</strong></div>
            <div>Central Hotline: +91 8072020716</div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-montserrat">
              <tr>
                <th className="p-3">Description</th>
                <th className="p-3 text-center">HSN/SAC</th>
                <th className="p-3 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3">
                  <div className="font-bold text-mcoa-midnight">
                    Tuition Installment #{selectedReceipt?.installmentNumber || 1}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {selectedReceipt?.notes || "Advanced Medical Coding Tuition Fee"}
                  </div>
                </td>
                <td className="p-3 text-center font-mono">999293</td>
                <td className="p-3 text-right font-mono font-bold text-mcoa-midnight">
                  ₹{((selectedReceipt?.amount || 15000) / 1.18).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="p-3 text-right font-semibold text-gray-600">
                  CGST (9%)
                </td>
                <td className="p-3 text-right font-mono text-gray-700">
                  ₹{((selectedReceipt?.amount || 15000) * 0.09 / 1.18).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="p-3 text-right font-semibold text-gray-600">
                  SGST (9%)
                </td>
                <td className="p-3 text-right font-mono text-gray-700">
                  ₹{((selectedReceipt?.amount || 15000) * 0.09 / 1.18).toFixed(2)}
                </td>
              </tr>
              <tr className="bg-mcoa-pearl/40 font-bold">
                <td colSpan={2} className="p-3 text-right text-mcoa-midnight">
                  Total Amount Paid (INR)
                </td>
                <td className="p-3 text-right font-mono text-base text-mcoa-midnight">
                  ₹{(selectedReceipt?.amount || 15000).toLocaleString()}.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Authorization Seal & Verification Footer */}
        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digitally Verified & Reconciled via Razorpay</span>
          </div>

          <div className="text-center sm:text-right">
            <div className="font-bold text-mcoa-midnight text-xs font-montserrat">
              Dr. Jeevanantham Mariappan
            </div>
            <div className="text-[10px] text-gray-400">Founder & CEO, MCOA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
