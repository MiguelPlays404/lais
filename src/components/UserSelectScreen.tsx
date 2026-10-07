import React, { useState, useEffect } from 'react';
import { TikTokLogo } from './TikTokLogo';
import { useLanguage } from '../context/LanguageContext';
import { 
  getLockoutState, 
  recordFailedAttempt, 
  recordFailedEmergencyCode,
  verifyPassword, 
  resetLockout, 
  LockoutState 
} from '../utils/security';
import { 
  Shield, 
  Lock, 
  KeyRound, 
  AlertTriangle, 
  Clock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Ban
} from 'lucide-react';

interface UserSelectScreenProps {
  onSelectUser: (user: 'lais' | 'livia') => void;
}

export const UserSelectScreen: React.FC<UserSelectScreenProps> = ({ onSelectUser }) => {
  const { t, language } = useLanguage();
  const [selectedUserCandidate, setSelectedUserCandidate] = useState<'lais' | 'livia' | null>(null);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [lockoutState, setLockoutState] = useState<LockoutState>(getLockoutState());
  const [remainingCooldown, setRemainingCooldown] = useState<number>(0);

  // Check lockout on mount and tick countdown
  useEffect(() => {
    const updateCooldown = () => {
      const state = getLockoutState();
      setLockoutState(state);
      const diff = Math.max(0, Math.ceil((state.lockoutUntil - Date.now()) / 1000));
      setRemainingCooldown(diff);
    };

    updateCooldown();
    const interval = setInterval(updateCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (user: 'lais' | 'livia') => {
    setSelectedUserCandidate(user);
    setPasswordInput('');
    setErrorMessage(null);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserCandidate) return;

    // Check if currently locked
    if (remainingCooldown > 0) {
      // Check if emergency code attempts are completely exhausted
      if (lockoutState.emergencyAttemptsLeft <= 0) {
        setErrorMessage(t.emergencyAttemptsExhausted);
        return;
      }

      // Check if user entered emergency master code 5656 to unlock
      if (passwordInput.trim() === '5656') {
        const fresh = resetLockout();
        setLockoutState(fresh);
        setRemainingCooldown(0);
        setSuccessNotice(t.masterCodeAccepted);
        setTimeout(() => {
          onSelectUser(selectedUserCandidate);
        }, 800);
        return;
      }

      // Wrong emergency code entered: record failure and decrement the 3 attempts limit!
      const { state, attemptsLeft } = recordFailedEmergencyCode();
      setLockoutState(state);
      
      if (attemptsLeft <= 0) {
        setErrorMessage(t.codeExhaustedWait);
      } else {
        setErrorMessage(`${t.codeIncorrect} ${attemptsLeft}`);
      }
      return;
    }

    // Normal password attempt
    if (!passwordInput.trim()) {
      setErrorMessage(t.passwordEmpty);
      return;
    }

    const { success, isEmergencyUnlock } = await verifyPassword(passwordInput);

    if (success) {
      setErrorMessage(null);
      setSuccessNotice(isEmergencyUnlock ? t.masterCodeAccepted : t.passwordCorrect);
      setTimeout(() => {
        onSelectUser(selectedUserCandidate);
      }, 600);
    } else {
      const { state, isLocked, remainingSeconds } = recordFailedAttempt();
      setLockoutState(state);
      setRemainingCooldown(remainingSeconds);

      if (isLocked) {
        setErrorMessage(`${t.limitExceededLocked} ${formatSeconds(remainingSeconds)}.`);
      } else {
        const left = 5 - state.failedAttempts;
        setErrorMessage(`${t.passwordIncorrect} ${left}`);
      }
    }
  };

  const formatSeconds = (sec: number): string => {
    if (sec >= 60) {
      const mins = Math.floor(sec / 60);
      const remainingSecs = sec % 60;
      return `${mins}m ${remainingSecs < 10 ? '0' : ''}${remainingSecs}s`;
    }
    return language === 'en' ? `${sec} seconds` : `${sec} segundos`;
  };

  const isEmergencyCodeDisabled = remainingCooldown > 0 && lockoutState.emergencyAttemptsLeft <= 0;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FE2C55]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#25F4EE]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl text-center space-y-8 animate-in fade-in duration-300">
        
        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <TikTokLogo size={48} />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-semibold mt-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.restrictedAccess}</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.whoIsAccessing}
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            {t.selectUserPrompt}
          </p>
        </div>

        {/* Cards for Stefanny and Vânia */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          
          {/* Card 1: Stefanny (Pink theme) */}
          <button
            type="button"
            onClick={() => handleCardClick('lais')}
            className="group relative p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border-2 border-neutral-800 hover:border-[#FE2C55] transition-all duration-300 text-left flex flex-col justify-between hover:bg-neutral-850 hover:shadow-2xl hover:shadow-[#FE2C55]/20 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FE2C55] to-[#FF0050] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-[#FE2C55]/30">
                S
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#FE2C55]/15 border border-[#FE2C55]/30 text-[#FE2C55] flex items-center gap-1">
                <Lock className="w-3 h-3" />
                {language === 'en' ? 'Secured' : 'Protegido'}
              </span>
            </div>

            <div>
              <div className="text-2xl font-black text-white group-hover:text-[#FE2C55] transition-colors">
                {t.userLais}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                {t.laisThemeDesc}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-bold text-neutral-300 group-hover:text-white">
              <span>{t.enterPasswordBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#FE2C55] group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Vânia (Inverted Cyan theme) */}
          <button
            type="button"
            onClick={() => handleCardClick('livia')}
            className="group relative p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border-2 border-neutral-800 hover:border-[#25F4EE] transition-all duration-300 text-left flex flex-col justify-between hover:bg-neutral-850 hover:shadow-2xl hover:shadow-[#25F4EE]/20 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#25F4EE] to-[#00C8C8] text-neutral-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-[#25F4EE]/30">
                V
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#25F4EE]/15 border border-[#25F4EE]/30 text-[#25F4EE] flex items-center gap-1">
                <Lock className="w-3 h-3" />
                {language === 'en' ? 'Secured' : 'Protegido'}
              </span>
            </div>

            <div>
              <div className="text-2xl font-black text-white group-hover:text-[#25F4EE] transition-colors">
                {t.userLivia}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                {t.liviaThemeDesc}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-bold text-neutral-300 group-hover:text-white">
              <span>{t.enterPasswordBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#25F4EE] group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

        </div>

        {/* Legal & Security Notice */}
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 text-[11px] text-neutral-500 space-y-1">
          <div className="font-semibold text-neutral-400">
            {t.allRightsReserved}
          </div>
          <p>
            {t.antiInspectionNotice}
          </p>
        </div>

      </div>

      {/* PASSWORD PROMPT MODAL */}
      {selectedUserCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md bg-[#161823] border-2 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-200"
            style={{
              borderColor: selectedUserCandidate === 'livia' ? '#25F4EE' : '#FE2C55'
            }}
          >
            {/* Top Close */}
            <button
              type="button"
              onClick={() => setSelectedUserCandidate(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div 
                className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg"
                style={{
                  background: selectedUserCandidate === 'livia' 
                    ? 'linear-gradient(135deg, #25F4EE, #00C8C8)'
                    : 'linear-gradient(135deg, #FE2C55, #FF0050)',
                  color: selectedUserCandidate === 'livia' ? '#000' : '#fff'
                }}
              >
                <KeyRound className="w-7 h-7" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {t.accessFor} {selectedUserCandidate === 'livia' ? t.userLivia : t.userLais}
              </h3>
              <p className="text-xs text-neutral-400">
                {remainingCooldown > 0 ? t.systemLockedTemp : t.enterPasswordModalPrompt}
              </p>
            </div>

            {/* Lockout Warning Banner if Locked */}
            {remainingCooldown > 0 && (
              <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm">
                  <Clock className="w-4 h-4 shrink-0 animate-pulse" />
                  <span>{t.activeLockout} {formatSeconds(remainingCooldown)}</span>
                </div>

                {isEmergencyCodeDisabled ? (
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-rose-500/50 text-rose-300 font-semibold flex items-center gap-2">
                    <Ban className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{t.emergencyAttemptsExhausted}</span>
                  </div>
                ) : (
                  <div className="text-neutral-300">
                    {t.unlockWithEmergencyCodePrompt}
                    <div className="mt-1 font-bold text-amber-400">
                      {t.emergencyAttemptsRemaining} {lockoutState.emergencyAttemptsLeft} / 3
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Success Notification */}
            {successNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && !successNotice && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Password / Emergency Code Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  disabled={isEmergencyCodeDisabled}
                  maxLength={10}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder={
                    isEmergencyCodeDisabled
                      ? t.waitForCountdown
                      : remainingCooldown > 0 
                      ? `${t.codePlaceholder} (${lockoutState.emergencyAttemptsLeft} left)` 
                      : t.passwordPlaceholder
                  }
                  className={`w-full px-4 py-3.5 bg-neutral-900 border rounded-xl text-white font-mono text-center tracking-widest text-xl focus:outline-none transition-all ${
                    isEmergencyCodeDisabled 
                      ? 'opacity-40 cursor-not-allowed border-neutral-800' 
                      : 'border-neutral-700 focus:border-white'
                  }`}
                />

                {!isEmergencyCodeDisabled && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                )}
              </div>

              {/* Remaining attempts indicator */}
              {remainingCooldown === 0 && (
                <div className="flex justify-between items-center text-[11px] text-neutral-500 px-1">
                  <span>{t.passwordAttemptsRemaining}</span>
                  <span className="font-bold text-neutral-300">
                    {5 - lockoutState.failedAttempts} / 5
                  </span>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={isEmergencyCodeDisabled}
                className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95 ${
                  isEmergencyCodeDisabled
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                    : ''
                }`}
                style={!isEmergencyCodeDisabled ? {
                  background: selectedUserCandidate === 'livia'
                    ? 'linear-gradient(90deg, #25F4EE, #00C8C8)'
                    : 'linear-gradient(90deg, #FE2C55, #E01740)',
                  color: selectedUserCandidate === 'livia' ? '#000' : '#fff',
                  boxShadow: selectedUserCandidate === 'livia'
                    ? '0 10px 25px -5px rgba(37, 244, 238, 0.25)'
                    : '0 10px 25px -5px rgba(254, 44, 85, 0.25)'
                } : undefined}
              >
                {isEmergencyCodeDisabled
                  ? t.waitForLockoutEnd
                  : remainingCooldown > 0 
                  ? `${t.unlockWithCodeBtn} (${lockoutState.emergencyAttemptsLeft})` 
                  : t.confirmAndAccess}
              </button>
            </form>

            {/* Emergency Unlock Hint Footer */}
            <div className="pt-2 text-center text-[10px] text-neutral-500">
              {t.emergencyNoticeFoot}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
