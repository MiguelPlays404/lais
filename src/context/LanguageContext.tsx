import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pt';

export interface Translations {
  // Brand
  brandName: string;
  brandTagline: string;
  restrictedAccess: string;
  allRightsReserved: string;
  antiInspectionNotice: string;

  // Login / User Select Screen
  whoIsAccessing: string;
  selectUserPrompt: string;
  laisThemeDesc: string;
  liviaThemeDesc: string;
  enterPasswordBtn: string;
  accessFor: string;
  systemLockedTemp: string;
  enterPasswordModalPrompt: string;
  activeLockout: string;
  emergencyAttemptsExhausted: string;
  unlockWithEmergencyCodePrompt: string;
  emergencyAttemptsRemaining: string;
  passwordPlaceholder: string;
  codePlaceholder: string;
  waitForCountdown: string;
  passwordAttemptsRemaining: string;
  confirmAndAccess: string;
  waitForLockoutEnd: string;
  unlockWithCodeBtn: string;
  emergencyNoticeFoot: string;
  passwordIncorrect: string;
  passwordEmpty: string;
  limitExceededLocked: string;
  codeIncorrect: string;
  codeExhaustedWait: string;
  masterCodeAccepted: string;
  passwordCorrect: string;

  // Header & Navigation
  rechargeCoinsNav: string;
  adminPanelNav: string;
  switchUser: string;
  rateLabel: string;
  walletBalance: string;
  hideBalance: string;
  showBalance: string;
  connectedStatus: string;
  offlineStatus: string;
  userLais: string;
  userLivia: string;

  // Recharge View
  saveBannerText: string;
  officialCenterSession: string;
  perCoin: string;
  secureTransaction: string;
  selectCoinsTitle: string;
  oneCoinEquals: string;
  coinsWord: string;
  customSquare: string;
  customSquareDesc: string;
  customAmountLabel: string;
  customInputPlaceholder: string;
  dollarConversion: string;
  recipientTitle: string;
  recipientSubtitle: string;
  recipientInputPlaceholder: string;
  confirmAtBtn: string;
  recipientSelectedLabel: string;
  readyToSend: string;
  removeRecipientTooltip: string;
  noRecipientSelected: string;
  transferSummary: string;
  totalUsdLabel: string;
  noteLabel: string;
  notePlaceholder: string;
  rechargeActionBtn: string;
  processingRecharge: string;
  disclaimerText: string;
  secretMmmNotice: string;
  errorSelectRecipient: string;
  errorValidCoins: string;

  // Confirmation Modal
  coinsSentSuccess: string;
  rechargeCreditedDesc: string;
  recipientLabel: string;
  usdValueLabel: string;
  rateInfo: string;
  txIdLabel: string;
  newRechargeBtn: string;
  viewInAdminBtn: string;
  viewReceiptLink: string;

  // Receipt Modal
  receiptTitle: string;
  receiptSubtitle: string;
  receiptCoinsTransfer: string;
  qtyCoinsLabel: string;
  coinRateLabel: string;
  totalUsdReceipt: string;
  statusLabel: string;
  statusCompleted: string;
  statusPending: string;
  statusCancelled: string;
  dateTimeLabel: string;
  noteReceiptLabel: string;
  copyTextBtn: string;
  copiedTextBtn: string;
  printBtn: string;

  // Admin Panel
  adminTitle: string;
  adminSubtitle: string;
  statTotalCoins: string;
  statTotalUsd: string;
  statCompleted: string;
  statPending: string;
  statCancelled: string;
  statRate: string;
  searchPlaceholder: string;
  filterAllStatuses: string;
  sortRecent: string;
  sortHighestCoins: string;
  sortLowestCoins: string;
  btnNewRecharge: string;
  btnExportCsv: string;
  btnClearPanel: string;
  clearModalTitle: string;
  clearModalDesc: string;
  cancelBtn: string;
  confirmClearBtn: string;
  thId: string;
  thRecipient: string;
  thCoins: string;
  thTotalUsd: string;
  thStatus: string;
  thDate: string;
  thActions: string;
  tooltipReceipt: string;
  tooltipRepeat: string;
  tooltipDelete: string;
  emptyPanelTitle: string;
  emptyPanelDesc: string;
  noFilterResults: string;
  toastRateUpdated: string;
  toastCsvExported: string;
  toastCleared: string;
  toastDeleted: string;
  toastStatusUpdated: string;
  editRatePrompt: string;
  saveBtn: string;

  // Hidden language switcher
  languageSwitcherLabel: string;
  languageSwitchedToast: string;

  // Footer
  footerCopyright: string;
  footerPanelOf: string;
}

const translationsEn: Translations = {
  // Brand
  brandName: 'Recarga Coins',
  brandTagline: 'Coins Center',
  restrictedAccess: 'Recarga Coins • Restricted Access',
  allRightsReserved: 'Recarga Coins • All rights reserved',
  antiInspectionNotice: 'Protected system against inspection and debugging shortcuts. Data secured by cryptographic keys.',

  // Login / User Select Screen
  whoIsAccessing: 'Who is signing in?',
  selectUserPrompt: 'Select your account and enter your security password to proceed.',
  laisThemeDesc: 'Official Pink and Cyan theme workspace',
  liviaThemeDesc: 'Inverted Cyan and Pink theme workspace',
  enterPasswordBtn: 'Enter Password',
  accessFor: 'Access for',
  systemLockedTemp: 'System temporarily locked',
  enterPasswordModalPrompt: 'Enter the 6-digit security password to enter the panel',
  activeLockout: 'Active Lockout:',
  emergencyAttemptsExhausted: 'Emergency code attempts exhausted (0 of 3). Please wait for the lockout countdown to expire.',
  unlockWithEmergencyCodePrompt: 'You can unlock immediately using the master code.',
  emergencyAttemptsRemaining: 'Remaining emergency code attempts:',
  passwordPlaceholder: 'Enter password (6 digits)',
  codePlaceholder: 'Enter master code',
  waitForCountdown: 'Please wait for the timer to reach zero...',
  passwordAttemptsRemaining: 'Password attempts remaining:',
  confirmAndAccess: 'Confirm & Sign In',
  waitForLockoutEnd: 'Wait For Lockout To Expire',
  unlockWithCodeBtn: 'Unlock with Master Code',
  emergencyNoticeFoot: 'Recarga Coins • If all 3 master code attempts fail, you must wait for the timer to finish.',
  passwordIncorrect: 'Incorrect password! Remaining attempts before lockout:',
  passwordEmpty: 'Please enter the access password.',
  limitExceededLocked: 'Attempt limit exceeded! Locked for',
  codeIncorrect: 'Incorrect master code! Attempts remaining:',
  codeExhaustedWait: 'You have exhausted all 3 master code attempts! You must now wait for the 45-minute lockout timer.',
  masterCodeAccepted: '🔓 Master code 5656 accepted! Lockout removed successfully.',
  passwordCorrect: '✓ Correct password! Accessing panel...',

  // Header & Navigation
  rechargeCoinsNav: 'Recharge Coins',
  adminPanelNav: 'Admin Panel',
  switchUser: 'Switch User',
  rateLabel: 'Rate:',
  walletBalance: 'Wallet Balance',
  hideBalance: 'Hide balance',
  showBalance: 'Show balance',
  connectedStatus: 'Connected',
  offlineStatus: 'Offline',
  userLais: 'Stefanny',
  userLivia: 'Vânia',

  // Recharge View
  saveBannerText: 'Recharge: Save around 25% with lower third-party service fees',
  officialCenterSession: 'Official Recarga Coins Center • Active Session:',
  perCoin: 'per Coin',
  secureTransaction: 'Secure Transaction',
  selectCoinsTitle: 'Select Coin Amount',
  oneCoinEquals: '1 Coin =',
  coinsWord: 'coins',
  customSquare: 'Custom',
  customSquareDesc: '(enter any custom amount)',
  customAmountLabel: 'Custom Coin Amount:',
  customInputPlaceholder: 'e.g. 10000',
  dollarConversion: 'USD Conversion',
  recipientTitle: 'Transfer Recipient (@)',
  recipientSubtitle: 'Type the account handle that will receive the coins',
  recipientInputPlaceholder: 'Type recipient @ (e.g. @username)',
  confirmAtBtn: 'Confirm @',
  recipientSelectedLabel: 'Selected Recipient',
  readyToSend: 'Ready for transfer',
  removeRecipientTooltip: 'Remove recipient',
  noRecipientSelected: 'No recipient selected. Enter the account @ above to transfer coins.',
  transferSummary: 'Transfer Summary',
  totalUsdLabel: 'Total in USD',
  noteLabel: 'Note / Transfer Message (Optional):',
  notePlaceholder: 'e.g. Live gift, creator support...',
  rechargeActionBtn: 'Recharge and Send',
  processingRecharge: 'Processing Recharge...',
  disclaimerText: 'Upon confirmation, the coins will be transferred to @, debited from your wallet balance and recorded in the administrative panel.',
  secretMmmNotice: '⚡ Code MMM recognized! Wallet balance reloaded to 8,000,000 coins successfully.',
  errorSelectRecipient: 'Please type and confirm the recipient @ before sending coins.',
  errorValidCoins: 'Please choose a valid coin amount.',

  // Confirmation Modal
  coinsSentSuccess: 'Coins sent successfully!',
  rechargeCreditedDesc: 'The recharge was credited successfully to the specified account.',
  recipientLabel: 'Recipient',
  usdValueLabel: 'Total USD Value:',
  rateInfo: 'Rate:',
  txIdLabel: 'Transaction ID:',
  newRechargeBtn: 'Send Another Recharge',
  viewInAdminBtn: 'View in Admin Panel',
  viewReceiptLink: 'View Transaction Receipt',

  // Receipt Modal
  receiptTitle: 'Recharge Receipt',
  receiptSubtitle: 'Recarga Coins Transaction',
  receiptCoinsTransfer: 'OFFICIAL COINS RECHARGE RECEIPT',
  qtyCoinsLabel: 'Coin Amount:',
  coinRateLabel: 'Coin Rate:',
  totalUsdReceipt: 'Total in USD:',
  statusLabel: 'Status:',
  statusCompleted: 'Completed',
  statusPending: 'Pending',
  statusCancelled: 'Cancelled',
  dateTimeLabel: 'Date & Time:',
  noteReceiptLabel: 'Note:',
  copyTextBtn: 'Copy Receipt Text',
  copiedTextBtn: 'Copied!',
  printBtn: 'Print',

  // Admin Panel
  adminTitle: 'Admin Control Panel',
  adminSubtitle: 'Real-time simulated transaction records & wallet audit',
  statTotalCoins: 'Total Coins Sent',
  statTotalUsd: 'Total USD Volume',
  statCompleted: 'Completed',
  statPending: 'Pending',
  statCancelled: 'Cancelled',
  statRate: 'Current Rate',
  searchPlaceholder: 'Search by @handle, transaction ID or note...',
  filterAllStatuses: 'All Statuses',
  sortRecent: 'Most Recent',
  sortHighestCoins: 'Highest Coin Amount',
  sortLowestCoins: 'Lowest Coin Amount',
  btnNewRecharge: 'New Recharge',
  btnExportCsv: 'Export CSV',
  btnClearPanel: 'Clear Panel',
  clearModalTitle: 'Clear Entire Panel?',
  clearModalDesc: 'This will permanently remove all transaction records from the system. This action cannot be undone.',
  cancelBtn: 'Cancel',
  confirmClearBtn: 'Yes, Clear All',
  thId: 'ID',
  thRecipient: 'Recipient',
  thCoins: 'Coins',
  thTotalUsd: 'USD Total',
  thStatus: 'Status',
  thDate: 'Date',
  thActions: 'Actions',
  tooltipReceipt: 'View receipt',
  tooltipRepeat: 'Repeat recharge',
  tooltipDelete: 'Delete record',
  emptyPanelTitle: 'Your Admin Panel is Empty',
  emptyPanelDesc: 'No recharges found. Use the recharge tab to transfer coins and track records here in real-time.',
  noFilterResults: 'No transactions match the selected filters.',
  toastRateUpdated: 'Coin rate updated to US$',
  toastCsvExported: 'CSV spreadsheet exported successfully!',
  toastCleared: 'Admin panel cleared successfully!',
  toastDeleted: 'Transaction record deleted.',
  toastStatusUpdated: 'Transaction status updated to',
  editRatePrompt: 'Set New Rate (US$):',
  saveBtn: 'Save',

  // Hidden language switcher
  languageSwitcherLabel: 'Language / Idioma',
  languageSwitchedToast: 'Language changed to English',

  // Footer
  footerCopyright: 'Recarga Coins • All rights reserved',
  footerPanelOf: 'Panel of',
};

const translationsPt: Translations = {
  // Brand
  brandName: 'Recarga Coins',
  brandTagline: 'Centro de Moedas',
  restrictedAccess: 'Recarga Coins • Acesso Restrito',
  allRightsReserved: 'Recarga Coins • Todos os direitos reservados',
  antiInspectionNotice: 'Sistema blindado contra inspeção e atalhos de depuração. Dados protegidos por chave de criptografia.',

  // Login / User Select Screen
  whoIsAccessing: 'Quem está acessando?',
  selectUserPrompt: 'Selecione o seu usuário e confirme sua senha de segurança para continuar.',
  laisThemeDesc: 'Painel com tema oficial Rosa e Ciano',
  liviaThemeDesc: 'Painel com tema invertido Ciano e Rosa',
  enterPasswordBtn: 'Digitar Senha',
  accessFor: 'Acesso de',
  systemLockedTemp: 'Sistema bloqueado temporariamente',
  enterPasswordModalPrompt: 'Digite a senha de 6 dígitos para entrar no painel',
  activeLockout: 'Bloqueio Ativo:',
  emergencyAttemptsExhausted: 'Tentativas do código esgotadas (0 de 3). Aguarde o término do cronômetro.',
  unlockWithEmergencyCodePrompt: 'Você pode desbloquear digitando o código mestre.',
  emergencyAttemptsRemaining: 'Tentativas restantes para o código:',
  passwordPlaceholder: 'Digite a senha (6 dígitos)',
  codePlaceholder: 'Digite o código mestre',
  waitForCountdown: 'Aguarde o cronômetro zerar...',
  passwordAttemptsRemaining: 'Tentativas da senha restantes:',
  confirmAndAccess: 'Confirmar e Acessar',
  waitForLockoutEnd: 'Aguarde o Tempo de Bloqueio',
  unlockWithCodeBtn: 'Desbloquear com Código',
  emergencyNoticeFoot: 'Recarga Coins • Se errar as 3 tentativas do código mestre, o tempo deve ser aguardado obrigatoriamente.',
  passwordIncorrect: 'Senha incorreta! Tentativas restantes antes do bloqueio:',
  passwordEmpty: 'Por favor, digite a senha de acesso.',
  limitExceededLocked: 'Limite de tentativas excedido! Bloqueado por',
  codeIncorrect: 'Código de emergência incorreto! Tentativas restantes:',
  codeExhaustedWait: 'Você esgotou as 3 tentativas do código! Agora é obrigatório aguardar os 45 minutos até o fim do cronômetro.',
  masterCodeAccepted: '🔓 Código mestre 5656 aceito! Bloqueio removido com sucesso.',
  passwordCorrect: '✓ Senha correta! Acessando painel...',

  // Header & Navigation
  rechargeCoinsNav: 'Recarregar Moedas',
  adminPanelNav: 'Painel Administrativo',
  switchUser: 'Trocar de Usuário',
  rateLabel: 'Cotação:',
  walletBalance: 'Saldo em Carteira',
  hideBalance: 'Ocultar saldo',
  showBalance: 'Mostrar saldo',
  connectedStatus: 'Conectado',
  offlineStatus: 'Offline',
  userLais: 'Stefanny',
  userLivia: 'Vânia',

  // Recharge View
  saveBannerText: 'Recarregar: Poupe cerca de 25% com uma taxa de serviços de terceiros mais baixa',
  officialCenterSession: 'Centro Oficial Recarga Coins • Sessão Ativa:',
  perCoin: 'por Coin',
  secureTransaction: 'Transação Segura',
  selectCoinsTitle: 'Selecione a Quantidade de Moedas',
  oneCoinEquals: '1 Moeda =',
  coinsWord: 'moedas',
  customSquare: 'Personalizar',
  customSquareDesc: '(digite qualquer quantia)',
  customAmountLabel: 'Quantidade Personalizada de Moedas:',
  customInputPlaceholder: 'Ex: 10000',
  dollarConversion: 'Conversão em Dólar',
  recipientTitle: 'Destinatário da Recarga (@)',
  recipientSubtitle: 'Digite a conta que receberá as moedas',
  recipientInputPlaceholder: 'Digite o @ do destinatário (ex: @usuario)',
  confirmAtBtn: 'Confirmar @',
  recipientSelectedLabel: 'Destinatário Selecionado',
  readyToSend: 'Pronto para envio',
  removeRecipientTooltip: 'Remover destinatário',
  noRecipientSelected: 'Nenhum destinatário selecionado. Digite o @ da conta acima para transferir as moedas.',
  transferSummary: 'Resumo do Envio',
  totalUsdLabel: 'Valor Total em Dólar',
  noteLabel: 'Observação / Mensagem do Envio (Opcional):',
  notePlaceholder: 'Ex: Presente em live, suporte ao criador...',
  rechargeActionBtn: 'Recarregar e Enviar',
  processingRecharge: 'Processando Recarga...',
  disclaimerText: 'Ao confirmar, as moedas serão transferidas para o @, debitando do seu saldo em carteira e registrando no painel administrativo.',
  secretMmmNotice: '⚡ Código MMM reconhecido! Saldo recarregado para 8.000.000 de moedas com sucesso.',
  errorSelectRecipient: 'Digite e confirme o @ do destinatário para enviar as moedas.',
  errorValidCoins: 'Selecione uma quantidade válida de moedas.',

  // Confirmation Modal
  coinsSentSuccess: 'Moedas enviadas com sucesso!',
  rechargeCreditedDesc: 'A recarga foi creditada com sucesso na conta informada.',
  recipientLabel: 'Destinatário',
  usdValueLabel: 'Valor em Dólar:',
  rateInfo: 'Cotação:',
  txIdLabel: 'ID da Transação:',
  newRechargeBtn: 'Fazer Nova Recarga',
  viewInAdminBtn: 'Ver no Painel Admin',
  viewReceiptLink: 'Visualizar Comprovante da Transação',

  // Receipt Modal
  receiptTitle: 'Comprovante de Recarga',
  receiptSubtitle: 'Transação Recarga Coins',
  receiptCoinsTransfer: 'COMPROVANTE OFICIAL DE RECARGA COINS',
  qtyCoinsLabel: 'Quantidade de Coins:',
  coinRateLabel: 'Cotação da Moeda:',
  totalUsdReceipt: 'Valor em Dólar:',
  statusLabel: 'Status:',
  statusCompleted: 'Concluída',
  statusPending: 'Pendente',
  statusCancelled: 'Cancelada',
  dateTimeLabel: 'Data e Hora:',
  noteReceiptLabel: 'Observação:',
  copyTextBtn: 'Copiar Texto',
  copiedTextBtn: 'Copiado!',
  printBtn: 'Imprimir',

  // Admin Panel
  adminTitle: 'Painel de Controle Administrativo',
  adminSubtitle: 'Gerenciamento de transações e auditoria em tempo real',
  statTotalCoins: 'Total de Moedas Enviadas',
  statTotalUsd: 'Volume em Dólar (US$)',
  statCompleted: 'Concluídas',
  statPending: 'Pendentes',
  statCancelled: 'Canceladas',
  statRate: 'Cotação Atual',
  searchPlaceholder: 'Filtrar por @destinatário, ID ou observação...',
  filterAllStatuses: 'Todos os Status',
  sortRecent: 'Mais Recentes',
  sortHighestCoins: 'Maior Quantidade de Moedas',
  sortLowestCoins: 'Menor Quantidade de Moedas',
  btnNewRecharge: 'Nova Recarga',
  btnExportCsv: 'Exportar CSV',
  btnClearPanel: 'Zerar Painel',
  clearModalTitle: 'Zerar Todo o Histórico?',
  clearModalDesc: 'Esta ação excluirá permanentemente todos os registros de transações do painel. Deseja continuar?',
  cancelBtn: 'Cancelar',
  confirmClearBtn: 'Sim, Zerar Tudo',
  thId: 'ID',
  thRecipient: 'Destinatário',
  thCoins: 'Moedas',
  thTotalUsd: 'Total USD',
  thStatus: 'Status',
  thDate: 'Data',
  thActions: 'Ações',
  tooltipReceipt: 'Ver comprovante',
  tooltipRepeat: 'Refazer recarga',
  tooltipDelete: 'Excluir registro',
  emptyPanelTitle: 'Seu Painel Administrativo está Zerado',
  emptyPanelDesc: 'Nenhuma transação encontrada. Faça recargas na aba principal para acompanhar os registros aqui em tempo real.',
  noFilterResults: 'Nenhuma transação corresponde aos filtros selecionados.',
  toastRateUpdated: 'Cotação atualizada para US$',
  toastCsvExported: 'Planilha CSV exportada com sucesso!',
  toastCleared: 'Painel administrativo zerado com sucesso!',
  toastDeleted: 'Registro de transação excluído.',
  toastStatusUpdated: 'Status da transação alterado para',
  editRatePrompt: 'Definir Nova Cotação (US$):',
  saveBtn: 'Salvar',

  // Hidden language switcher
  languageSwitcherLabel: 'Idioma / Language',
  languageSwitchedToast: 'Idioma alterado para Português',

  // Footer
  footerCopyright: 'Recarga Coins • Todos os direitos reservados',
  footerPanelOf: 'Painel de',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translationsEn,
});

const LANGUAGE_STORAGE_KEY = 'recarga_coins_language_pref';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default is English ('en') as requested: "deixe o site enteiro em ingles"
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'pt' || saved === 'en') return saved;
    } catch (e) {
      console.warn('Could not read saved language:', e);
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Could not save language:', e);
    }
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'pt' : 'en';
    setLanguage(next);
  };

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (e) {
      console.warn('Could not persist language:', e);
    }
  }, [language]);

  const t = language === 'en' ? translationsEn : translationsPt;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
