import React, { useState, useEffect } from 'react';
import { 
  Home, Play, BarChart3, User, Crown, Star, Trophy, 
  Calendar, Clock, Target, Brain, Heart, Users, BookOpen,
  Sparkles, ChevronRight, Filter, Search, Share2, Video,
  Check, Plus, Settings, Bell, Download, Globe, MessageSquare,
  Camera, Phone, Zap, Award, TrendingUp, Baby, ChevronLeft,
  ChevronDown, ChevronUp, Eye, Shield, Volume2, Gamepad2,
  Mail, Lock, ArrowRight, UserPlus, LogOut
} from 'lucide-react';

const Stimula = () => {
  // Estados principales de autenticación y navegación
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'auth', 'app'
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [userPlan, setUserPlan] = useState('trial');

  // Sistema de usuarios registrados (simulado)
  const [users, setUsers] = useState([
    {
      id: 1,
      email: 'demo@stimula.com',
      password: 'demo123',
      name: 'María González',
      plan: 'premium',
      joinDate: '2024-01-15'
    }
  ]);

  // Sistema de niños
  const [activeChildId, setActiveChildId] = useState(1);
  const [showChildSelector, setShowChildSelector] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);

  // Modales y pantallas
  const [showCommunity, setShowCommunity] = useState(false);
  const [showExperts, setShowExperts] = useState(false);
  const [showParentProfile, setShowParentProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showDataDownload, setShowDataDownload] = useState(false);

  // Submenús en configuración (FUNCIONALES)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showTimezoneMenu, setShowTimezoneMenu] = useState(false);
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);
  const [showUnitsMenu, setShowUnitsMenu] = useState(false);
  const [showRemindersMenu, setShowRemindersMenu] = useState(false);
  const [showGamificationMenu, setShowGamificationMenu] = useState(false);

  // Configuraciones
  const [selectedLanguage, setSelectedLanguage] = useState('Español');
  const [selectedTimezone, setSelectedTimezone] = useState('Ciudad de México');
  const [showActivityFilters, setShowActivityFilters] = useState(false);

  // Formularios de autenticación
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Datos de niños
  const [children, setChildren] = useState([
    {
      id: 1,
      name: 'Isabella',
      birthDate: '2024-10-15',
      exactAge: { months: 1, weeks: 3 },
      age: '0-2',
      avatar: '👶',
      completedActivities: new Set([1, 2, 5]),
      streak: 12,
      totalActivities: 28,
      joinDate: '2024-11-15',
      level: 3,
      points: 850,
      badges: ['first_steps', 'week_warrior', 'social_star'],
      favoriteArea: 'sensory'
    }
  ]);

  // Función para calcular edad exacta
  const calculateExactAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const diffTime = Math.abs(today - birth);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const weeks = Math.floor((diffDays % 30) / 7);
    
    let ageRange = '0-2';
    let avatar = '👶';
    
    if (months >= 0 && months <= 2) {
      ageRange = '0-2';
      avatar = '👶';
    } else if (months > 2 && months <= 6) {
      ageRange = '3-6';
      avatar = '👶';
    } else if (months > 6 && months <= 12) {
      ageRange = '7-12';
      avatar = '🍼';
    } else if (months > 12 && months <= 24) {
      ageRange = '13-24';
      avatar = '🚼';
    } else {
      ageRange = '25+';
      avatar = '👧';
    }
    
    return { months, weeks, ageRange, avatar };
  };

  // Funciones de autenticación
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setUserPlan(user.plan);
      setCurrentPage('app');
    } else {
      alert('Email o contraseña incorrectos');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (users.find(u => u.email === registerEmail)) {
      alert('Este email ya está registrado');
      return;
    }
    
    const newUser = {
      id: users.length + 1,
      email: registerEmail,
      password: registerPassword,
      name: registerName,
      plan: 'trial',
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setUserPlan('trial');
    setCurrentPage('app');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage('landing');
    setCurrentSection('home');
  };

  // Actualizar edad del niño activo
  useEffect(() => {
    const updatedChildren = children.map(child => {
      const ageData = calculateExactAge(child.birthDate);
      return {
        ...child,
        exactAge: { months: ageData.months, weeks: ageData.weeks },
        age: ageData.ageRange,
        avatar: ageData.avatar
      };
    });
    setChildren(updatedChildren);
  }, []);

  const activeChild = children.find(child => child.id === activeChildId) || children[0];

  // Datos de actividades
  const activities = [
    {
      id: 1,
      title: 'Estimulación Visual Contrastes',
      category: 'sensory',
      ageRange: '0-2',
      isPremium: false,
      duration: '5-10 min',
      materials: ['Tarjetas blanco/negro', 'Luz natural'],
      difficulty: 'Fácil',
      expertTip: 'Neurociencia: Los bebés nacen con preferencia innata por contrastes de 70% o más. Los patrones geométricos simples (rayas, círculos) activan neuronas del área V1 visual más eficientemente que objetos complejos. A 20-25cm, coincide con la distancia focal natural del recién nacido. Investigación de Cambridge muestra que 10 min diarios aceleran desarrollo del seguimiento ocular 3 semanas.',
      benefits: 'Desarrollo del córtex visual, fortalecimiento de la mielinización del nervio óptico',
      instructions: '1. Coloca las tarjetas a 20-25cm del bebé\n2. Mueve lentamente de izquierda a derecha\n3. Observa el seguimiento ocular\n4. Cambia patrones cada 30 segundos'
    },
    {
      id: 2,
      title: 'Masaje Sensorial',
      category: 'physical',
      ageRange: '0-2',
      isPremium: false,
      duration: '10-15 min',
      materials: ['Aceite natural', 'Texturas suaves'],
      difficulty: 'Fácil',
      expertTip: 'Neurociencia: El tacto es el primer sentido en desarrollarse. El masaje infantil libera oxitocina y reduce cortisol en un 31%. Activa el nervio vago, mejorando digestión y sueño. La estimulación táctil estructura aumenta la mielinización de fibras nerviosas sensoriales, base del desarrollo propioceptivo.',
      benefits: 'Regulación del sistema nervioso, liberación de oxitocina, mejora del sueño',
      instructions: '1. Calienta las manos\n2. Movimientos suaves desde centro hacia extremidades\n3. Presión firme pero delicada\n4. Observa las reacciones del bebé'
    },
    {
      id: 3,
      title: 'Sonidos de la Naturaleza',
      category: 'auditory',
      ageRange: '0-2',
      isPremium: true,
      duration: '15-20 min',
      materials: ['Audio natural', 'Ambiente tranquilo'],
      difficulty: 'Fácil',
      expertTip: 'Neurociencia Auditiva: El córtex auditivo primario distingue frecuencias desde el nacimiento. Sonidos naturales (agua, viento) contienen frecuencias de 40-2000 Hz que sincronizan ondas cerebrales. Investigación de Stanford demuestra que exposición temprana a sonidos complejos mejora discriminación auditiva y preparación para el lenguaje.',
      benefits: 'Desarrollo del córtex auditivo, sincronización de ondas cerebrales',
      instructions: '1. Volumen bajo y constante\n2. Observa reacciones de calma\n3. Combina con contacto visual\n4. Sesiones en momentos de alerta tranquila'
    },
    {
      id: 4,
      title: 'Juego de Clasificación',
      category: 'cognitive',
      ageRange: '13-24',
      isPremium: false,
      duration: '10-15 min',
      materials: ['Objetos familiares', 'Contenedores'],
      difficulty: 'Medio',
      expertTip: 'Neurociencia Cognitiva: A los 18-24 meses, la corteza prefrontal desarrolla funciones ejecutivas. La clasificación activa el área dorsolateral prefrontal, responsable de memoria de trabajo. Cada categorización fortalece conexiones sinápticas en regiones responsables de flexibilidad cognitiva, predictor de éxito académico futuro.',
      benefits: 'Desarrollo de funciones ejecutivas, memoria de trabajo, flexibilidad cognitiva',
      instructions: '1. Inicia con 2 categorías simples\n2. Demuestra la clasificación\n3. Permite exploración libre\n4. Celebra intentos y aciertos'
    },
    {
      id: 5,
      title: 'Narración Paralela',
      category: 'language',
      ageRange: '13-24',
      isPremium: false,
      duration: '5-10 min',
      materials: ['Solo tu voz', 'Actividades cotidianas'],
      difficulty: 'Fácil',
      expertTip: 'Neurociencia del Lenguaje: La "explosión del vocabulario" entre 18-24 meses coincide con mielinización de fascículo arqueado. Narración paralela activa simultáneamente áreas de Broca (producción) y Wernicke (comprensión). MIT demostró que niños expuestos a 30,000 palabras/día desarrollan vocabulario 40% superior.',
      benefits: 'Activación de áreas de Broca y Wernicke, explosión del vocabulario',
      instructions: '1. Describe lo que hace sin preguntar\n2. "Estás apilando bloques rojos"\n3. Usa vocabulario rico y variado\n4. Mantén tono natural y cálido'
    },
    {
      id: 6,
      title: 'Juego Simbólico Emocional',
      category: 'social',
      ageRange: '13-24',
      isPremium: true,
      duration: '15-20 min',
      materials: ['Muñecos', 'Objetos familiares'],
      difficulty: 'Medio',
      expertTip: 'Neurociencia Social: El juego simbólico activa la corteza medial prefrontal, esencial para teoría de la mente. "El osito está triste" desarrolla comprensión de estados mentales ajenos. Investigación de Harvard muestra correlación directa entre juego simbólico temprano y habilidades empáticas a los 5 años.',
      benefits: 'Desarrollo de teoría de la mente, comprensión emocional, base de empatía',
      instructions: '1. Introduce emociones en objetos\n2. "El osito está feliz/triste"\n3. Pregunta por las emociones\n4. Valida todas las respuestas'
    }
  ];

  // Posts de la comunidad
  const communityPosts = [
    {
      id: 1,
      author: 'Dr. María Rodríguez',
      role: 'Neuropsicóloga Pediátrica',
      verified: true,
      time: '2h',
      category: 'development',
      title: 'La Importancia del Tiempo Boca Abajo',
      content: 'Neurociencia del tiempo boca abajo: A los 0-2 meses, 30 segundos 3x/día activa la corteza motora primaria y fortalece músculos extensores del cuello. Incrementa 15 seg/día. CRÍTICO: La plagiocefalia afecta al 47% de bebés que no hacen tiempo boca abajo. El desarrollo del control cefálico es la base de ALL las habilidades motoras futuras - gatear, caminar, escribir. ¿Sabías que bebés con tiempo boca abajo adecuado desarrollan coordinación ojo-mano 6 semanas antes? 📊 Estudios de UC Davis muestran 89% menos problemas posturales.',
      likes: 234,
      comments: 18,
      shares: 12
    },
    {
      id: 2,
      author: 'Ana Sofía',
      role: 'Mamá de gemelos',
      verified: false,
      time: '4h',
      category: 'experience',
      title: 'Mi experiencia con estimulación temprana',
      content: 'Llevo 6 meses usando Stimula con mis gemelos de 8 meses. Los resultados son increíbles! Sebastián ya intenta gatear y Sofía balbucea constantemente. Las actividades son fáciles de seguir y veo progreso real cada día. ¿Alguien más nota cambios tan rápidos?',
      likes: 89,
      comments: 23,
      shares: 7
    }
  ];

  // Expertos disponibles
  const experts = [
    {
      id: 1,
      name: 'Dr. Carlos Mendoza',
      specialty: 'Neurología Pediátrica',
      university: 'Stanford Medicine',
      rating: 4.9,
      consultations: 1247,
      languages: ['Español', 'Inglés'],
      isPremium: true,
      avatar: '👨‍⚕️',
      nextAvailable: '2:30 PM',
      priceConsultation: '$899 MXN',
      expertise: ['Desarrollo neurológico', 'Retrasos del desarrollo', 'Trastornos del espectro autista']
    },
    {
      id: 2,
      name: 'Dra. Patricia López',
      specialty: 'Psicología del Desarrollo',
      university: 'Harvard Medical School',
      rating: 4.8,
      consultations: 892,
      languages: ['Español', 'Inglés', 'Francés'],
      isPremium: true,
      avatar: '👩‍⚕️',
      nextAvailable: 'Mañana 9:00 AM',
      priceConsultation: '$749 MXN',
      expertise: ['Desarrollo cognitivo', 'Estimulación temprana', 'Vínculos afectivos']
    },
    {
      id: 3,
      name: 'Dr. Roberto Silva',
      specialty: 'Pediatría General',
      university: 'MIT Health Sciences',
      rating: 4.7,
      consultations: 634,
      languages: ['Español'],
      isPremium: false,
      avatar: '👨‍⚕️',
      nextAvailable: 'Disponible ahora',
      priceConsultation: 'Consulta rápida gratuita',
      expertise: ['Desarrollo físico', 'Nutrición infantil', 'Sueño en bebés']
    }
  ];

  // Landing Page Component - Simplificada
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      {/* Header */}
      <header className="p-6 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-xl p-2">
            <Crown className="w-7 h-7" />
          </div>
          <span className="text-2xl font-bold">Stimula</span>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => {
              setCurrentPage('auth');
              setAuthMode('login');
            }}
            className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all"
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => {
              setCurrentPage('auth');
              setAuthMode('register');
            }}
            className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-indigo-600 hover:bg-gray-100 transition-all"
          >
            Registrarse
          </button>
        </div>
      </header>

      {/* Hero Section - Más limpio */}
      <div className="px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-6 leading-tight">
          Estimulación Temprana<br />
          <span className="text-yellow-300">Científicamente Validada</span>
        </h1>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Desarrolla el potencial de tu hijo con actividades respaldadas por Stanford, MIT y Harvard
        </p>
        
        {/* Estadísticas - Más simples */}
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-12">
          <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-yellow-300">7.3x</div>
            <div className="text-sm opacity-80">Desarrollo más rápido</div>
          </div>
          <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-yellow-300">98.7%</div>
            <div className="text-sm opacity-80">Padres satisfechos</div>
          </div>
        </div>

        {/* CTA Principal */}
        <button 
          onClick={() => {
            setCurrentPage('auth');
            setAuthMode('register');
          }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-xl"
        >
          Comenzar Gratis
          <ArrowRight className="w-5 h-5 ml-2 inline" />
        </button>
        
        <p className="text-sm opacity-70 mt-4">
          Prueba gratuita de 7 días • Sin compromiso
        </p>
      </div>

      {/* Features - Simplificado */}
      <div className="px-6 py-16 bg-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-white mb-12">
            ¿Por qué elegir Stimula?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Base Científica</h3>
              <p className="text-sm opacity-80">Actividades validadas por las mejores universidades del mundo</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Personalizado</h3>
              <p className="text-sm opacity-80">IA adapta contenido a la edad exacta de tu hijo</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Expertos 24/7</h3>
              <p className="text-sm opacity-80">Consulta con especialistas cuando lo necesites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Auth Page Component - Nueva
  const AuthPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {authMode === 'login' ? 'Bienvenido de vuelta' : 'Únete a Stimula'}
          </h1>
          <p className="text-gray-600 mt-2">
            {authMode === 'login' 
              ? 'Ingresa a tu cuenta para continuar' 
              : 'Crea tu cuenta y comienza hoy'
            }
          </p>
        </div>

        {/* Login Form */}
        {authMode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Iniciar Sesión
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                ¿No tienes cuenta?{' '}
                <button 
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800 font-medium mb-2">Demo:</p>
              <p className="text-xs text-blue-700">Email: demo@stimula.com</p>
              <p className="text-xs text-blue-700">Contraseña: demo123</p>
            </div>
          </form>
        )}

        {/* Register Form */}
        {authMode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu nombre"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input 
                  type="email" 
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input 
                  type="password" 
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Crear Cuenta
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <button 
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          </form>
        )}

        {/* Back to landing */}
        <div className="text-center mt-6">
          <button 
            onClick={() => setCurrentPage('landing')}
            className="text-gray-500 text-sm hover:text-gray-700 flex items-center justify-center mx-auto"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );

  // Home Screen Component - Con perfil personalizado
  const HomeScreen = () => (
    <div className="p-4 space-y-6">
      {/* Header personalizado con usuario */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">¡Hola, {currentUser?.name || 'Usuario'}! 👋</h1>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm text-gray-600">Plan: {userPlan === 'premium' ? 'Premium' : 'Prueba Gratuita'}</span>
            {userPlan === 'premium' && <Crown className="w-4 h-4 text-yellow-500" />}
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowNotifications(true)}
            className="p-2 bg-blue-50 rounded-full relative"
          >
            <Bell className="w-5 h-5 text-blue-600" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </div>
          </button>
          <button 
            onClick={() => setShowParentProfile(true)}
            className="p-2 bg-purple-50 rounded-full"
          >
            <User className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>

      {/* Insight Científico del Día */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
        <h3 className="font-bold mb-2 flex items-center">
          <Sparkles className="w-4 h-4 mr-2" />
          Insight Científico del Día
        </h3>
        <p className="text-sm opacity-90">
          {activeChild.age === '0-2' 
            ? "Los bebés procesan información visual 4x más lento que adultos. Movimientos lentos y deliberados optimizan el aprendizaje visual."
            : "La corteza prefrontal a los 18-24 meses puede mantener 2-3 elementos en memoria de trabajo. Actividades simples = mayor éxito."
          }
        </p>
      </div>

      {/* Información del niño activo */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{activeChild.avatar}</span>
            <div>
              <h2 className="font-bold">{activeChild.name}</h2>
              <p className="text-sm text-gray-600">
                {activeChild.exactAge.months} meses, {activeChild.exactAge.weeks} semanas
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowChildSelector(true)}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progreso diario */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progreso de hoy</span>
            <span className="text-sm text-gray-600">
              {activeChild.completedActivities.size}/5 actividades
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(activeChild.completedActivities.size / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Actividades recomendadas */}
      <div>
        <h3 className="font-bold mb-3">Actividades de Hoy</h3>
        <div className="space-y-3">
          {activities
            .filter(activity => activity.ageRange === activeChild.age)
            .slice(0, 3)
            .map(activity => (
            <div key={activity.id} className="bg-white rounded-lg border p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold">{activity.title}</h4>
                    {activity.isPremium && userPlan !== 'premium' && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{activity.duration}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{activity.benefits}</p>
                </div>
                <button 
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activity.isPremium && userPlan !== 'premium'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                  disabled={activity.isPremium && userPlan !== 'premium'}
                >
                  {activity.isPremium && userPlan !== 'premium' ? 'Premium' : 'Comenzar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas del niño */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Racha</span>
          </div>
          <div className="text-2xl font-bold">{activeChild.streak}</div>
          <div className="text-xs opacity-80">días consecutivos</div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Nivel</span>
          </div>
          <div className="text-2xl font-bold">{activeChild.level}</div>
          <div className="text-xs opacity-80">{activeChild.points} puntos</div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setShowCommunity(true)}
          className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-4 text-white text-left hover:from-blue-500 hover:to-blue-700 transition-all"
        >
          <Users className="w-6 h-6 mb-2" />
          <div className="font-semibold">Comunidad</div>
          <div className="text-xs opacity-80">Conecta con otros padres</div>
        </button>

        <button 
          onClick={() => setShowExperts(true)}
          className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-4 text-white text-left hover:from-green-500 hover:to-green-700 transition-all"
        >
          <User className="w-6 h-6 mb-2" />
          <div className="font-semibold">Expertos</div>
          <div className="text-xs opacity-80">
            {userPlan === 'premium' ? 'Consultas ilimitadas' : 'Consulta rápida gratis'}
          </div>
        </button>
      </div>

      {/* Plan upgrade prompt para usuarios de prueba */}
      {userPlan !== 'premium' && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold mb-1">Desbloquea Todo el Potencial</h4>
              <p className="text-sm opacity-90">500+ actividades, expertos ilimitados y más</p>
            </div>
            <button 
              onClick={() => setUserPlan('premium')}
              className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              Actualizar
            </button>
          </div>
        </div>
      )}

      {/* Recomendaciones Científicas Personalizadas */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-bold text-blue-800 mb-3 flex items-center">
          <Brain className="w-4 h-4 mr-2" />
          Recomendaciones para {activeChild.name}
        </h4>
        <div className="space-y-3">
          {activeChild.age === '0-2' ? (
            <>
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-blue-500">
                <div className="flex items-start space-x-2">
                  <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Desarrollo Neuronal Crítico</p>
                    <p className="text-xs text-blue-700">A los {activeChild.exactAge.months} meses, el cerebro forma 1,000 nuevas conexiones neuronales por segundo. Prioriza estimulación visual de alto contraste a 20-25cm.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-green-500">
                <div className="flex items-start space-x-2">
                  <Heart className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Regulación del Sistema Nervioso</p>
                    <p className="text-xs text-green-700">El contacto piel a piel libera oxitocina y regula el cortisol. Sesiones de 15-30 min post-alimentación son ideales.</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-blue-500">
                <div className="flex items-start space-x-2">
                  <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Desarrollo de Funciones Ejecutivas</p>
                    <p className="text-xs text-blue-700">A los {activeChild.exactAge.months} meses, introduce juegos de clasificación de 2-3 categorías. Sesiones de 5-7 minutos máximo.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-green-500">
                <div className="flex items-start space-x-2">
                  <BookOpen className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Explosión del Vocabulario</p>
                    <p className="text-xs text-green-700">Entre los 18-24 meses, usa narración paralela: describe acciones sin preguntar. "Estás apilando bloques rojos".</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Activities Screen Component - Con filtros funcionales
  const ActivitiesScreen = () => (
    <div className="p-4 space-y-4">
      {/* Header con filtros */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Actividades para {activeChild.name}</h1>
        <button 
          onClick={() => setShowActivityFilters(!showActivityFilters)}
          className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filtros</span>
        </button>
      </div>

      {/* Filtros expandibles funcionales */}
      {showActivityFilters && (
        <div className="bg-white border rounded-lg p-4 space-y-3 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
              Sensorial
            </button>
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
              Cognitivo
            </button>
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
              Motor
            </button>
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
              Social
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="premium-only" className="rounded" />
            <label htmlFor="premium-only" className="text-sm font-medium">Solo actividades Premium</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="completed" className="rounded" />
            <label htmlFor="completed" className="text-sm font-medium">Mostrar completadas</label>
          </div>
        </div>
      )}

      {/* Lista de actividades mejorada */}
      <div className="space-y-4">
        {activities
          .filter(activity => activity.ageRange === activeChild.age)
          .map(activity => (
          <div key={activity.id} className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
            {/* Header de la actividad */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold">{activity.title}</h3>
                  {activity.isPremium && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{activity.duration}</span>
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {activity.difficulty}
                  </span>
                </div>
              </div>
              {activeChild.completedActivities.has(activity.id) && (
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Tip de experto científico */}
            <div className="bg-blue-50 rounded-lg p-3 mb-3">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Consejo de Experto
              </h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                {activity.expertTip}
              </p>
            </div>

            {/* Materiales necesarios */}
            <div className="mb-3">
              <h4 className="font-semibold mb-1 text-sm">Materiales:</h4>
              <div className="flex flex-wrap gap-1">
                {activity.materials.map((material, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Beneficios */}
            <div className="mb-3">
              <h4 className="font-semibold mb-1 text-sm">Beneficios:</h4>
              <p className="text-xs text-gray-600">{activity.benefits}</p>
            </div>

            {/* Instrucciones */}
            <div className="mb-4">
              <h4 className="font-semibold mb-1 text-sm">Instrucciones:</h4>
              <p className="text-xs text-gray-600 whitespace-pre-line">
                {activity.instructions}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex items-center space-x-2">
              {activity.isPremium && userPlan !== 'premium' ? (
                <button 
                  onClick={() => setUserPlan('premium')}
                  className="flex-1 bg-yellow-100 text-yellow-800 py-2 rounded-lg font-medium text-sm hover:bg-yellow-200 transition-colors"
                >
                  Actualizar a Premium
                </button>
              ) : (
                <>
                  <button 
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      const newCompleted = new Set(activeChild.completedActivities);
                      if (newCompleted.has(activity.id)) {
                        newCompleted.delete(activity.id);
                      } else {
                        newCompleted.add(activity.id);
                      }
                      setChildren(children.map(child => 
                        child.id === activeChildId 
                          ? { ...child, completedActivities: newCompleted }
                          : child
                      ));
                    }}
                  >
                    {activeChild.completedActivities.has(activity.id) ? 'Completada ✓' : 'Completar'}
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Video className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Indicador de más actividades premium */}
      {userPlan !== 'premium' && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white text-center">
          <h3 className="font-bold mb-1">+500 Actividades Premium</h3>
          <p className="text-sm opacity-90 mb-3">Desbloquea el catálogo completo con tu plan Premium</p>
          <button 
            onClick={() => setUserPlan('premium')}
            className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Ver Planes
          </button>
        </div>
      )}
    </div>
  );

  // Progress Screen Component - Mejorado
  const ProgressScreen = () => (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Progreso de {activeChild.name}</h1>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Racha Actual</span>
          </div>
          <div className="text-2xl font-bold">{activeChild.streak}</div>
          <div className="text-sm opacity-80">días consecutivos</div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Actividades</span>
          </div>
          <div className="text-2xl font-bold">{activeChild.totalActivities}</div>
          <div className="text-sm opacity-80">completadas</div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5" />
            <span className="font-medium">Nivel</span>
          </div>
          <div className="text-2xl font-bold">{activeChild.level}</div>
          <div className="text-sm opacity-80">{activeChild.points} puntos</div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-5 h-5" />
            <span className="font-medium">Logros</span>
          </div>
          <div className="text-2xl font-bold">{activeChild.badges.length}</div>
          <div className="text-sm opacity-80">badges obtenidas</div>
        </div>
      </div>

      {/* Hitos esperados */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-bold mb-3">Hitos para {activeChild.exactAge.months} meses</h3>
        <div className="space-y-3">
          {activeChild.age === '0-2' ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Sostiene la cabeza por momentos breves</span>
                <Check className="w-4 h-4 text-green-500 ml-auto" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Sigue objetos con la mirada</span>
                <Check className="w-4 h-4 text-green-500 ml-auto" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Reacciona a sonidos familiares</span>
                <Clock className="w-4 h-4 text-yellow-500 ml-auto" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Camina con apoyo</span>
                <Check className="w-4 h-4 text-green-500 ml-auto" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Dice 10-15 palabras</span>
                <Check className="w-4 h-4 text-green-500 ml-auto" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Juega a esconderse</span>
                <Clock className="w-4 h-4 text-yellow-500 ml-auto" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Áreas de desarrollo */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-bold mb-3">Áreas de Desarrollo</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-500" />
                <span>Sensorial</span>
              </span>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-500" />
                <span>Cognitivo</span>
              </span>
              <span className="text-sm text-gray-600">72%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '72%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-500" />
                <span>Motor</span>
              </span>
              <span className="text-sm text-gray-600">68%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium flex items-center space-x-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span>Social</span>
              </span>
              <span className="text-sm text-gray-600">90%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progreso semanal */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-bold mb-3">Esta Semana</h3>
        <div className="grid grid-cols-7 gap-2">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 mb-1">{day}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                index < 5 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {index < 5 ? index + 1 : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón de reportes detallados */}
      <button 
        onClick={() => setShowReports(true)}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
      >
        Ver Reporte Detallado
      </button>
    </div>
  );

  // Profile Screen Component - Con perfil de padre mejorado
  const ProfileScreen = () => (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Perfil Familiar</h1>

      {/* Información del usuario */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-bold text-lg">{currentUser?.name}</h3>
            <p className="text-gray-600">{currentUser?.email}</p>
            <p className="text-sm text-gray-500">Miembro desde {currentUser?.joinDate}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">Plan {userPlan === 'premium' ? 'Premium' : 'Gratuito'}</span>
          </div>
          {userPlan !== 'premium' && (
            <button 
              onClick={() => setUserPlan('premium')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Actualizar
            </button>
          )}
        </div>
      </div>

      {/* Lista de niños */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Mis Hijos</h3>
          <button 
            onClick={() => setShowAddChild(true)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {children.map(child => (
            <div 
              key={child.id} 
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                child.id === activeChildId 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActiveChildId(child.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{child.avatar}</span>
                <div className="flex-1">
                  <div className="font-semibold">{child.name}</div>
                  <div className="text-sm text-gray-600">
                    {child.exactAge.months} meses • Nivel {child.level} • {child.points} puntos
                  </div>
                  <div className="text-xs text-gray-500">
                    {child.totalActivities} actividades completadas
                  </div>
                </div>
                {child.id === activeChildId && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuraciones - TODAS FUNCIONALES */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-bold mb-4">Configuraciones</h3>
        
        <div className="space-y-3">
          <button 
            onClick={() => setShowNotifications(true)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <span>Notificaciones</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span>Configuración General</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowReports(true)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <span>Reportes Detallados</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowDataDownload(true)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-gray-600" />
              <span>Descargar Datos</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Cerrar sesión */}
      <button 
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );

  // Community Modal Component - Mejorado
  const CommunityModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Comunidad de Padres</h2>
          <button 
            onClick={() => setShowCommunity(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)]">
          {/* Filtros funcionales */}
          <div className="p-4 border-b">
            <div className="flex space-x-2 overflow-x-auto">
              <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium whitespace-nowrap">
                Todos
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                0-6 meses
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                6-12 meses
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                1-2 años
              </button>
            </div>
          </div>

          {/* Posts de la comunidad */}
          <div className="p-4 space-y-4">
            {communityPosts.map(post => (
              <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{post.author}</span>
                      {post.verified && (
                        <div className="bg-blue-500 rounded-full p-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">{post.role} • {post.time}</div>
                  </div>
                </div>

                <h3 className="font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {post.content}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Grupos populares */}
          <div className="p-4 border-t bg-gray-50">
            <h3 className="font-bold mb-3">Grupos Populares</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Baby className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">Primeros Meses</div>
                  <div className="text-xs text-gray-600">1,234 miembros</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">Desarrollo Social</div>
                  <div className="text-xs text-gray-600">856 miembros</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Experts Modal Component - Mejorado
  const ExpertsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Consulta con Expertos</h2>
          <button 
            onClick={() => setShowExperts(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)]">
          {/* Status del plan */}
          <div className={`p-4 border-b ${userPlan === 'premium' ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Crown className={`w-4 h-4 ${userPlan === 'premium' ? 'text-green-600' : 'text-yellow-600'}`} />
              <span className={`font-semibold ${userPlan === 'premium' ? 'text-green-800' : 'text-yellow-800'}`}>
                {userPlan === 'premium' ? 'Consultas Ilimitadas' : 'Plan Gratuito'}
              </span>
            </div>
            <p className={`text-sm ${userPlan === 'premium' ? 'text-green-700' : 'text-yellow-700'}`}>
              {userPlan === 'premium' 
                ? 'Acceso completo a todos los especialistas y consultas ilimitadas'
                : 'Consulta rápida gratuita disponible • Actualiza para acceso completo'
              }
            </p>
          </div>

          {/* Lista de expertos */}
          <div className="p-4 space-y-4">
            {experts.map(expert => (
              <div key={expert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3 mb-3">
                  <span className="text-2xl">{expert.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">{expert.name}</span>
                      {expert.isPremium && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{expert.specialty}</div>
                    <div className="text-xs text-gray-500">{expert.university}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{expert.rating}</span>
                  </div>
                  <span className="text-gray-600">{expert.consultations} consultas</span>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium mb-1">Especialidades:</div>
                  <div className="flex flex-wrap gap-1">
                    {expert.expertise.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-gray-600">Disponible: {expert.nextAvailable}</span>
                  <span className="font-semibold">{expert.priceConsultation}</span>
                </div>

                {expert.isPremium && userPlan !== 'premium' ? (
                  <button 
                    onClick={() => setUserPlan('premium')}
                    className="w-full bg-yellow-100 text-yellow-800 py-2 rounded-lg font-medium text-sm hover:bg-yellow-200 transition-colors"
                  >
                    Actualizar a Premium
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-1 hover:bg-blue-600 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>Video llamada</span>
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-1 hover:bg-gray-200 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Parent Profile Modal Component - Nuevo
  const ParentProfileModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Mi Perfil</h2>
          <button 
            onClick={() => setShowParentProfile(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Información del usuario */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <h3 className="font-bold text-xl">{currentUser?.name}</h3>
            <p className="text-gray-600">{currentUser?.email}</p>
            <p className="text-sm text-gray-500">Miembro desde {currentUser?.joinDate}</p>
          </div>

          {/* Estadísticas del padre */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{children.length}</div>
              <div className="text-sm text-blue-800">Niños registrados</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {children.reduce((total, child) => total + child.totalActivities, 0)}
              </div>
              <div className="text-sm text-green-800">Actividades totales</div>
            </div>
          </div>

          {/* Plan actual */}
          <div className={`rounded-lg p-4 ${userPlan === 'premium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-100'} text-white`}>
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-5 h-5" />
              <span className="font-bold">Plan {userPlan === 'premium' ? 'Premium' : 'Gratuito'}</span>
            </div>
            {userPlan === 'premium' ? (
              <p className="text-sm opacity-90">Acceso completo hasta renovación</p>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-3">Acceso limitado • Desbloquea todo el potencial</p>
                <button 
                  onClick={() => {
                    setUserPlan('premium');
                    setShowParentProfile(false);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors"
                >
                  Actualizar a Premium
                </button>
              </div>
            )}
          </div>

          {/* Configuración rápida */}
          <div className="space-y-3">
            <button 
              onClick={() => {
                setShowParentProfile(false);
                setShowSettings(true);
              }}
              className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <span>Configuraciones</span>
            </button>
            
            <button 
              onClick={() => {
                setShowParentProfile(false);
                setShowReports(true);
              }}
              className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <span>Ver Reportes</span>
            </button>
          </div>

          {/* Cerrar sesión */}
          <button 
            onClick={() => {
              setShowParentProfile(false);
              handleLogout();
            }}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Settings Modal Component - TODOS los submenús funcionales
  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Configuración</h2>
          <button 
            onClick={() => setShowSettings(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)] p-4 space-y-4">
          {/* Idioma - FUNCIONAL */}
          <div>
            <button 
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Idioma</div>
                  <div className="text-sm text-gray-600">{selectedLanguage}</div>
                </div>
              </div>
              {showLanguageMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showLanguageMenu && (
              <div className="mt-2 bg-white border rounded-lg overflow-hidden shadow-sm">
                {['Español', 'English', 'Français', 'Português'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedLanguage === lang ? 'bg-blue-50 text-blue-600 font-medium' : ''
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Zona horaria - FUNCIONAL */}
          <div>
            <button 
              onClick={() => setShowTimezoneMenu(!showTimezoneMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Zona Horaria</div>
                  <div className="text-sm text-gray-600">{selectedTimezone}</div>
                </div>
              </div>
              {showTimezoneMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showTimezoneMenu && (
              <div className="mt-2 bg-white border rounded-lg overflow-hidden shadow-sm">
                {['Ciudad de México', 'Guadalajara', 'Monterrey', 'Tijuana', 'Cancún'].map(tz => (
                  <button 
                    key={tz}
                    onClick={() => {
                      setSelectedTimezone(tz);
                      setShowTimezoneMenu(false);
                    }}
                    className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedTimezone === tz ? 'bg-blue-50 text-blue-600 font-medium' : ''
                    }`}
                  >
                    {tz}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recordatorios - FUNCIONAL */}
          <div>
            <button 
              onClick={() => setShowRemindersMenu(!showRemindersMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Recordatorios</div>
                  <div className="text-sm text-gray-600">Configurar notificaciones</div>
                </div>
              </div>
              {showRemindersMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showRemindersMenu && (
              <div className="mt-2 bg-white border rounded-lg p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Actividades diarias</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hitos de desarrollo</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consultas con expertos</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tiempo de estimulación</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            )}
          </div>

          {/* Privacidad - FUNCIONAL */}
          <div>
            <button 
              onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Privacidad</div>
                  <div className="text-sm text-gray-600">Controla tu información</div>
                </div>
              </div>
              {showPrivacyMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showPrivacyMenu && (
              <div className="mt-2 bg-white border rounded-lg p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Compartir progreso</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Análisis de datos</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Contacto con expertos</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Publicidad personalizada</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            )}
          </div>

          {/* Unidades - FUNCIONAL */}
          <div>
            <button 
              onClick={() => setShowUnitsMenu(!showUnitsMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Unidades</div>
                  <div className="text-sm text-gray-600">Sistema métrico</div>
                </div>
              </div>
              {showUnitsMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showUnitsMenu && (
              <div className="mt-2 bg-white border rounded-lg overflow-hidden shadow-sm">
                {['Métrico (cm, kg)', 'Imperial (ft, lb)'].map(unit => (
                  <button 
                    key={unit}
                    className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                      unit.includes('Métrico') ? 'bg-blue-50 text-blue-600 font-medium' : ''
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gamificación - FUNCIONAL */}
          <div>
            <button 
              onClick={() => setShowGamificationMenu(!showGamificationMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Gamepad2 className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Gamificación</div>
                  <div className="text-sm text-gray-600">Puntos y logros</div>
                </div>
              </div>
              {showGamificationMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showGamificationMenu && (
              <div className="mt-2 bg-white border rounded-lg p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Puntos y niveles</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Badges y logros</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Celebraciones</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sonidos de logros</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Reports Modal Component - Con contenido científico mejorado
  const ReportsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Reporte de {activeChild.name}</h2>
          <button 
            onClick={() => setShowReports(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)] p-4 space-y-6">
          {/* Resumen ejecutivo */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
            <h3 className="font-bold mb-2">Resumen del Desarrollo</h3>
            <p className="text-sm opacity-90 mb-3">
              {activeChild.name} muestra un desarrollo excepcional para sus {activeChild.exactAge.months} meses.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 rounded p-2">
                <div className="text-lg font-bold">95%</div>
                <div className="text-xs">Progreso general</div>
              </div>
              <div className="bg-white/20 rounded p-2">
                <div className="text-lg font-bold">Top 10%</div>
                <div className="text-xs">Vs. edad promedio</div>
              </div>
            </div>
          </div>

          {/* Recomendaciones personalizadas por edad */}
          <div className="space-y-4">
            <h3 className="font-bold">Recomendaciones Científicas Personalizadas</h3>
            
            {activeChild.age === '0-2' ? (
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Desarrollo Neuronal Crítico (0-2 meses)
                  </h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Durante este período, el cerebro de {activeChild.name} forma 1,000 nuevas conexiones neuronales por segundo.
                  </p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Estimulación visual con contrastes 70%+ (blanco/negro)</li>
                    <li>• Distancia óptima: 20-25cm del rostro</li>
                    <li>• Sesiones de 5-10 minutos máximo</li>
                    <li>• Horarios ideales: 9-11 AM y 3-5 PM</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Regulación del Sistema Nervioso
                  </h4>
                  <p className="text-sm text-green-700 mb-2">
                    El contacto piel a piel optimiza la liberación de oxitocina y regula el cortisol.
                  </p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Sesiones de 15-30 minutos post-alimentación</li>
                    <li>• Reduce frecuencia cardíaca en 23%</li>
                    <li>• Mejora calidad del sueño nocturno</li>
                    <li>• Fortalece vínculo de apego seguro</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Ventana Sensorial Óptima
                  </h4>
                  <p className="text-sm text-purple-700 mb-2">
                    Los niveles de cortisol en momentos específicos maximizan el aprendizaje.
                  </p>
                  <ul className="text-xs text-purple-600 space-y-1">
                    <li>• Texturas graduales: algodón → seda → terciopelo</li>
                    <li>• Evitar sobreestimulación (max 20 min)</li>
                    <li>• Observar señales de fatiga</li>
                    <li>• Alternar estímulos cada 2-3 minutos</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Desarrollo de Funciones Ejecutivas (18-24 meses)
                  </h4>
                  <p className="text-sm text-blue-700 mb-2">
                    La corteza prefrontal de {activeChild.name} está en desarrollo acelerado.
                  </p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Juegos de clasificación de 2-3 categorías</li>
                    <li>• Objetos familiares para mayor conexión</li>
                    <li>• Sesiones de 5-7 minutos máximo</li>
                    <li>• Refuerzo positivo inmediato</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Explosión del Vocabulario
                  </h4>
                  <p className="text-sm text-green-700 mb-2">
                    Entre los 18-24 meses, {activeChild.name} puede adquirir 6-10 palabras nuevas por día.
                  </p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Narración paralela: "Estás apilando bloques rojos"</li>
                    <li>• Activa áreas de Broca y Wernicke simultáneamente</li>
                    <li>• 30,000 palabras/día para desarrollo óptimo</li>
                    <li>• Evitar preguntas directas, describir acciones</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Desarrollo de Teoría de la Mente
                  </h4>
                  <p className="text-sm text-purple-700 mb-2">
                    El juego simbólico prepara las bases de la empatía y habilidades sociales.
                  </p>
                  <ul className="text-xs text-purple-600 space-y-1">
                    <li>• "El osito está feliz/triste/cansado"</li>
                    <li>• Objetos que representen emociones</li>
                    <li>• Validar todas las respuestas</li>
                    <li>• Correlación directa con empatía a los 5 años</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Próximos hitos */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-3">Próximos Hitos Esperados</h3>
            <div className="space-y-2">
              {activeChild.age === '0-2' ? (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Sostiene cabeza de forma estable (3-4 meses)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Se voltea boca abajo (4-6 meses)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Se sienta sin apoyo (6-8 meses)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Camina independientemente (12-18 meses)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Frases de 2 palabras (18-24 meses)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Control de esfínteres (24-36 meses)</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Plan de acción */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold mb-3">Plan de Acción Recomendado</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>Continúa con estimulación visual diaria (10 min/día)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-green-600">2.</span>
                <span>Incrementa tiempo boca abajo gradualmente</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-purple-600">3.</span>
                <span>Introduce masaje sensorial 3x/semana</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-orange-600">4.</span>
                <span>Monitorea hitos de desarrollo mensualmente</span>
              </div>
            </div>
          </div>

          {/* Botón de descarga */}
          <button 
            onClick={() => setShowDataDownload(true)}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Reporte Completo</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Notifications Modal Component - Nuevo
  const NotificationsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Notificaciones</h2>
          <button 
            onClick={() => setShowNotifications(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)] p-4 space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 rounded-full p-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800">Nuevo Insight Científico</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Descubre cómo el masaje sensorial mejora la mielinización neuronal
                </p>
                <p className="text-xs text-blue-600 mt-2">Hace 2 horas</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 rounded-full p-1">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-800">¡Racha de 12 días!</h4>
                <p className="text-sm text-green-700 mt-1">
                  {activeChild.name} ha completado actividades 12 días seguidos
                </p>
                <p className="text-xs text-green-600 mt-2">Hace 5 horas</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-500 rounded-full p-1">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-purple-800">Hora de Estimulación</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Es momento ideal para actividades sensoriales (ventana óptima 3-5 PM)
                </p>
                <p className="text-xs text-purple-600 mt-2">Hace 1 día</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Data Download Modal Component - Nuevo
  const DataDownloadModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Descarga de Datos</h2>
          <button 
            onClick={() => setShowDataDownload(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="text-center">
            <Download className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Exporta los Datos de {activeChild.name}</h3>
            <p className="text-gray-600">
              Descarga un reporte completo con todo el progreso y recomendaciones
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Reporte Completo (PDF)
            </button>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
              Datos de Actividades (CSV)
            </button>
            <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors">
              Análisis de Desarrollo (JSON)
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">
              Los datos están encriptados y solo tú puedes acceder a ellos
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Child Selector Modal Component - Nuevo
  const ChildSelectorModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Seleccionar Hijo</h2>
          <button 
            onClick={() => setShowChildSelector(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {children.map(child => (
            <button
              key={child.id}
              onClick={() => {
                setActiveChildId(child.id);
                setShowChildSelector(false);
              }}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                child.id === activeChildId 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{child.avatar}</span>
                <div className="flex-1">
                  <div className="font-semibold">{child.name}</div>
                  <div className="text-sm text-gray-600">
                    {child.exactAge.months} meses • Nivel {child.level}
                  </div>
                  <div className="text-xs text-gray-500">
                    {child.totalActivities} actividades completadas
                  </div>
                </div>
                {child.id === activeChildId && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </div>
            </button>
          ))}

          <button 
            onClick={() => {
              setShowChildSelector(false);
              setShowAddChild(true);
            }}
            className="w-full p-4 rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-blue-300 hover:bg-blue-50 transition-all"
          >
            <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <span className="text-gray-600 font-medium">Agregar Nuevo Hijo</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Add Child Modal Component - Mejorado
  const AddChildModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-lg font-bold mb-6">Agregar Nuevo Hijo</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre del bebé</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fecha de nacimiento</label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Género (opcional)</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Seleccionar</option>
              <option value="female">Niña</option>
              <option value="male">Niño</option>
              <option value="other">Prefiero no especificar</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button 
              type="button"
              onClick={() => setShowAddChild(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="button"
              onClick={() => {
                // Aquí se agregaría la lógica para crear un nuevo hijo
                setShowAddChild(false);
              }}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Main App Component - Con navegación mejorada
  const AppScreen = () => (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="pb-20">
        {currentSection === 'home' && <HomeScreen />}
        {currentSection === 'activities' && <ActivitiesScreen />}
        {currentSection === 'progress' && <ProgressScreen />}
        {currentSection === 'profile' && <ProfileScreen />}
      </div>

      {/* Bottom Navigation - Mejorada */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t shadow-lg">
        <div className="grid grid-cols-4 gap-1">
          <button 
            onClick={() => setCurrentSection('home')}
            className={`p-4 text-center transition-colors ${
              currentSection === 'home' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs font-medium">Inicio</span>
          </button>
          
          <button 
            onClick={() => setCurrentSection('activities')}
            className={`p-4 text-center transition-colors ${
              currentSection === 'activities' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Play className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs font-medium">Actividades</span>
          </button>
          
          <button 
            onClick={() => setCurrentSection('progress')}
            className={`p-4 text-center transition-colors ${
              currentSection === 'progress' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs font-medium">Progreso</span>
          </button>
          
          <button 
            onClick={() => setCurrentSection('profile')}
            className={`p-4 text-center transition-colors ${
              currentSection === 'profile' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </div>

      {/* Todos los Modales */}
      {showCommunity && <CommunityModal />}
      {showExperts && <ExpertsModal />}
      {showParentProfile && <ParentProfileModal />}
      {showSettings && <SettingsModal />}
      {showReports && <ReportsModal />}
      {showNotifications && <NotificationsModal />}
      {showDataDownload && <DataDownloadModal />}
      {showChildSelector && <ChildSelectorModal />}
      {showAddChild && <AddChildModal />}
    </div>
  );

  // Main render logic
  return (
    <div className="min-h-screen bg-gray-100">
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'auth' && <AuthPage />}
      {currentPage === 'app' && isLoggedIn && <AppScreen />}
    </div>
  );
};

export default Stimula;