import React, { useState } from 'react';
import { TikTokLogo } from './TikTokLogo';
import { TikTokCoin } from './TikTokCoin';
import { useLanguage } from '../context/LanguageContext';
import { Transaction } from '../types';
import { formatNumber, formatUSD, formatDate } from '../utils/formatters';
import { X, CheckCircle2, Copy, Check, Printer } from 'lucide-react';

interface ReceiptModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ transaction, isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !transaction) return null;

  const numLocale = language === 'pt' ? 'pt-BR' : 'en-US';

  const statusMap = {
    completed: t.statusCompleted,
    pending: t.statusPending,
    cancelled: t.statusCancelled,
  };

  const handleCopy = () => {
    const text = `${t.receiptCoinsTransfer}
${t.thId}: ${transaction.id}
${t.recipientLabel}: ${transaction.targetUsername}
${t.thCoins}: ${formatNumber(transaction.coins, numLocale)}
${t.totalUsdLabel}: ${formatUSD(transaction.totalUsd)} (${t.rateInfo} ${formatUSD(transaction.usdRate)})
${t.statusLabel} ${statusMap[transaction.status].toUpperCase()}
${t.dateTimeLabel} ${formatDate(transaction.createdAt, numLocale)}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#161823] text-white rounded-3xl border border-neutral-700/80 shadow-2xl p-6 sm:p-7 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <TikTokLogo size={28} />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="my-5 text-center">
          <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-extrabold text-white">{t.receiptTitle}</h4>
          <p className="text-xs text-neutral-400 mt-0.5">{t.receiptSubtitle}</p>
        </div>

        <div className="space-y-3 p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-sm">
          <div className="flex justify-between items-center text-xs text-neutral-400">
            <span>{t.txIdLabel.replace(':', '')}</span>
            <span className="font-mono text-neutral-300">{transaction.id}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-400">{t.recipientLabel}:</span>
            <span className="font-black text-base text-[#25F4EE]">{transaction.targetUsername}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-400">{t.qtyCoinsLabel}</span>
            <span className="font-extrabold text-amber-400 flex items-center gap-1">
              <TikTokCoin size={16} />
              {formatNumber(transaction.coins, numLocale)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-400">{t.coinRateLabel}</span>
            <span className="font-medium text-neutral-300">{formatUSD(transaction.usdRate)} / {language === 'pt' ? 'moeda' : 'coin'}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-neutral-800 text-base">
            <span className="font-bold text-white">{t.totalUsdReceipt}</span>
            <span className="font-black text-white">{formatUSD(transaction.totalUsd)}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-neutral-400 pt-1">
            <span>{t.statusLabel}</span>
            <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
              transaction.status === 'completed' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                : transaction.status === 'pending'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}>
              {statusMap[transaction.status]}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-neutral-400">
            <span>{t.dateTimeLabel}</span>
            <span className="text-neutral-300">{formatDate(transaction.createdAt, numLocale)}</span>
          </div>

          {transaction.note && (
            <div className="pt-2 border-t border-neutral-800/80 text-xs text-neutral-400">
              <span className="block font-semibold text-neutral-300 mb-0.5">{t.noteReceiptLabel}</span>
              <p className="italic text-neutral-400">"{transaction.note}"</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs border border-neutral-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copiedTextBtn : t.copyTextBtn}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs border border-neutral-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
