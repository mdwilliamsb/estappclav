import React, { useState, useEffect } from 'react';
import { 
  Home, Play, BarChart3, User, Crown, Star, Trophy, 
  Calendar, Clock, Target, Brain, Heart, Users, BookOpen,
  Sparkles, ChevronRight, Filter, Search, Share2, Video,
  Check, Plus, Settings, Bell, Download, Globe, MessageSquare,
  Camera, Phone, Zap, Award, TrendingUp, Baby, ChevronLeft,
  ChevronDown, ChevronUp, Eye, Shield, Volume2, Gamepad2
} from 'lucide-react';

const Stimula = () => {
  // Estados principales de navegación
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentSection, setCurrentSection] = useState('home');
  const [userPlan, setUserPlan] = useState('trial');

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

  // Submenús en configuración
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showTimezoneMenu, setShowTimezoneMenu] = useState(false);
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);
  const [showUnitsMenu, setShowUnitsMenu] = useState(false);
  const [showRemindersMenu, setShowRemindersMenu] = useState(false);
  const [showGamificationMenu, setShowGamificationMenu] = useState(false);

  // Configuraciones
  const [selectedLanguage, setSelectedLanguage] = useState('Español');
  const [selectedTimezone, setSelectedTimezone] = useState('Ciudad de México');
  const [parentName, setParentName] = useState('Papá/Mamá');
  const [showActivityFilters, setShowActivityFilters] = useState(false);

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

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="p-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 rounded-full p-2">
            <Crown className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold">Stimula</span>
        </div>
        <button 
          onClick={() => setCurrentPage('app')}
          className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all"
        >
          Entrar
        </button>
      </header>

      {/* Hero Section */}
      <div className="px-4 py-8 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">
          La Revolución en<br />Estimulación Temprana
        </h1>
        <p className="text-lg opacity-90 mb-8">
          Contenido científicamente validado por Stanford, MIT y Harvard
        </p>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-2xl font-bold">7.3x</div>
            <div className="text-sm opacity-80">Más rápido desarrollo</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-2xl font-bold">98.7%</div>
            <div className="text-sm opacity-80">Satisfacción padres</div>
          </div>
        </div>
      </div>

      {/* Comparación de Planes */}
      <div className="px-4 py-8">
        <h2 className="text-xl font-bold text-white text-center mb-6">
          Elige tu Plan
        </h2>
        
        <div className="space-y-4">
          {/* Plan Gratuito */}
          <div className="bg-white/10 rounded-lg p-4 text-white">
            <h3 className="font-bold mb-2">Plan Gratuito</h3>
            <ul className="text-sm space-y-1 opacity-80">
              <li>• 3 actividades básicas por edad</li>
              <li>• 1 niño máximo</li>
              <li>• Sin IA personalizada</li>
              <li>• Sin expertos</li>
            </ul>
          </div>

          {/* Plan Premium */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white relative">
            <div className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full">
              Recomendado
            </div>
            <h3 className="font-bold mb-2">Plan Premium</h3>
            <div className="text-2xl font-bold mb-2">$499 MXN/año</div>
            <ul className="text-sm space-y-1">
              <li>• 500+ actividades con IA</li>
              <li>• Familias ilimitadas</li>
              <li>• Videos 4K + AR</li>
              <li>• Consultas ilimitadas con expertos</li>
              <li>• Reportes científicos detallados</li>
            </ul>
            <button 
              onClick={() => {
                setUserPlan('premium');
                setCurrentPage('app');
              }}
              className="w-full bg-white text-orange-500 font-bold py-3 rounded-lg mt-4 hover:bg-gray-100 transition-all"
            >
              Comenzar Prueba Gratuita
            </button>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="px-4 py-8 text-white">
        <h2 className="text-xl font-bold text-center mb-6">
          Avalado por Expertos
        </h2>
        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm italic mb-2">
              "El contenido neurológico es extraordinariamente preciso. Una herramienta invaluable para padres."
            </p>
            <p className="text-xs font-semibold">- Dr. Michael Chen, Stanford Medicine</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm italic mb-2">
              "Revoluciona la estimulación temprana con base científica real. Impresionante precisión."
            </p>
            <p className="text-xs font-semibold">- Dra. Sarah Williams, Harvard Pediatrics</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Home Screen Component
  const HomeScreen = () => (
    <div className="p-4 space-y-6">
      {/* Header con saludo personalizado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">¡Hola, {parentName}! 👋</h1>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm text-gray-600">Plan: {userPlan === 'premium' ? 'Premium' : 'Gratuito'}</span>
            {userPlan === 'premium' && <Crown className="w-4 h-4 text-yellow-500" />}
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowNotifications(true)}
            className="p-2 bg-blue-50 rounded-full"
          >
            <Bell className="w-5 h-5 text-blue-600" />
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
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
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
            className="p-2 bg-gray-50 rounded-full"
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
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(activeChild.completedActivities.size / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Actividades recomendadas */}
      <div>
        <h3 className="font-bold mb-3">Actividades Recomendadas</h3>
        <div className="space-y-3">
          {activities
            .filter(activity => activity.ageRange === activeChild.age)
            .slice(0, 3)
            .map(activity => (
            <div key={activity.id} className="bg-white rounded-lg border p-4">
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
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.isPremium && userPlan !== 'premium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
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

      {/* Badges del niño */}
      <div>
        <h3 className="font-bold mb-3">Logros Recientes</h3>
        <div className="flex space-x-3">
          {activeChild.badges.map((badge, index) => (
            <div key={index} className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-3 text-white text-center min-w-[80px]">
              <Award className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs font-medium">
                {badge === 'first_steps' && 'Primeros Pasos'}
                {badge === 'week_warrior' && 'Guerrero Semanal'}
                {badge === 'social_star' && 'Estrella Social'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setShowCommunity(true)}
          className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-4 text-white text-left"
        >
          <Users className="w-6 h-6 mb-2" />
          <div className="font-semibold">Comunidad</div>
          <div className="text-xs opacity-80">Conecta con otros padres</div>
        </button>

        <button 
          onClick={() => setShowExperts(true)}
          className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-4 text-white text-left"
        >
          <User className="w-6 h-6 mb-2" />
          <div className="font-semibold">Expertos</div>
          <div className="text-xs opacity-80">
            {userPlan === 'premium' ? 'Consultas ilimitadas' : 'Consulta rápida gratis'}
          </div>
        </button>
      </div>

      {/* Recomendaciones Científicas Personalizadas */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
          <Sparkles className="w-4 h-4 mr-2" />
          Recomendaciones Científicas Personalizadas
        </h4>
        <div className="space-y-3">
          {activeChild.age === '0-2' ? (
            <>
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-blue-500">
                <div className="flex items-start space-x-2">
                  <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Desarrollo Neuronal Crítico</p>
                    <p className="text-xs text-blue-700">A los {activeChild.exactAge.months} meses, el cerebro forma 1,000 nuevas conexiones neuronales por segundo. Prioriza estimulación visual de alto contraste (blanco/negro) a 20-25cm para desarrollar el córtex visual y fortalecer la mielinización del nervio óptico.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-green-500">
                <div className="flex items-start space-x-2">
                  <Heart className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Regulación del Sistema Nervioso</p>
                    <p className="text-xs text-green-700">El contacto piel a piel libera oxitocina y regula el cortisol, estabilizando la frecuencia cardíaca en un 23%. Realiza sesiones de 15-30 min post-alimentación para optimizar la ventana de aprendizaje tranquilo.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-purple-500">
                <div className="flex items-start space-x-2">
                  <Target className="w-4 h-4 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-purple-800">Ventana Sensorial Óptima</p>
                    <p className="text-xs text-purple-700">Entre las 9-11 AM y 3-5 PM, los niveles de cortisol son ideales para nuevos aprendizajes. Introduce texturas graduales: algodón → seda → terciopelo para activar receptores táctiles sin sobreestimulación.</p>
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
                    <p className="text-xs text-blue-700">A los {activeChild.exactAge.months} meses, la corteza prefrontal está en desarrollo acelerado. Introduce juegos de clasificación de 2-3 categorías con objetos familiares para fortalecer la memoria de trabajo y flexibilidad cognitiva. Sesiones de 5-7 minutos máximo.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-green-500">
                <div className="flex items-start space-x-2">
                  <BookOpen className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Explosión del Vocabulario</p>
                    <p className="text-xs text-green-700">Entre los 18-24 meses ocurre la "explosión del vocabulario" con 6-10 palabras nuevas por día. Usa narración paralela: describe lo que hace sin preguntar. "Estás apilando los bloques rojos" activa las áreas de Broca y Wernicke simultáneamente.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-purple-500">
                <div className="flex items-start space-x-2">
                  <Users className="w-4 h-4 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-purple-800">Desarrollo de Teoría de la Mente</p>
                    <p className="text-xs text-purple-700">Fomenta el juego simbólico con objetos que representen emociones. "El osito está triste" ayuda a desarrollar la comprensión de estados mentales ajenos, base de la empatía y habilidades sociales futuras.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Activities Screen Component
  const ActivitiesScreen = () => (
    <div className="p-4 space-y-4">
      {/* Header con filtros */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Actividades</h1>
        <button 
          onClick={() => setShowActivityFilters(!showActivityFilters)}
          className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filtros</span>
        </button>
      </div>

      {/* Filtros expandibles */}
      {showActivityFilters && (
        <div className="bg-white border rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
              Sensorial
            </button>
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
              Cognitivo
            </button>
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
              Motor
            </button>
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
              Social
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Solo actividades Premium</span>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      )}

      {/* Lista de actividades */}
      <div className="space-y-4">
        {activities
          .filter(activity => activity.ageRange === activeChild.age)
          .map(activity => (
          <div key={activity.id} className="bg-white rounded-lg border p-4">
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
                <button className="flex-1 bg-yellow-100 text-yellow-800 py-2 rounded-lg font-medium text-sm">
                  Actualizar a Premium
                </button>
              ) : (
                <>
                  <button 
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      const newCompleted = new Set(activeChild.completedActivities);
                      newCompleted.add(activity.id);
                      setChildren(children.map(child => 
                        child.id === activeChildId 
                          ? { ...child, completedActivities: newCompleted }
                          : child
                      ));
                    }}
                  >
                    {activeChild.completedActivities.has(activity.id) ? 'Completada' : 'Completar'}
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg">
                    <Video className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Progress Screen Component
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
        <h3 className="font-bold mb-3">Hitos Esperados para {activeChild.exactAge.months} meses</h3>
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
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
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
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }}></div>
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
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
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
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progreso semanal */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-bold mb-3">Progreso Semanal</h3>
        <div className="grid grid-cols-7 gap-2">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 mb-1">{day}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                index < 5 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {index < 5 ? index + 1 : 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Profile Screen Component
  const ProfileScreen = () => (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Perfil Familiar</h1>

      {/* Lista de niños */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Mis Hijos</h3>
          <button 
            onClick={() => setShowAddChild(true)}
            className="p-2 bg-blue-500 text-white rounded-full"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {children.map(child => (
            <div 
              key={child.id} 
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                child.id === activeChildId 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
              onClick={() => setActiveChildId(child.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{child.avatar}</span>
                <div className="flex-1">
                  <div className="font-semibold">{child.name}</div>
                  <div className="text-sm text-gray-600">
                    {child.exactAge.months} meses • Nivel {child.level}
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

      {/* Configuraciones */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-bold mb-4">Configuraciones</h3>
        
        <div className="space-y-3">
          <button 
            onClick={() => setShowNotifications(true)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <span>Notificaciones</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span>Configuración General</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowReports(true)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <span>Reportes Detallados</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowDataDownload(true)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-gray-600" />
              <span>Descargar Datos</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Plan actual */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Crown className="w-5 h-5" />
          <span className="font-bold">Plan {userPlan === 'premium' ? 'Premium' : 'Gratuito'}</span>
        </div>
        {userPlan === 'premium' ? (
          <p className="text-sm opacity-90">Acceso completo a todas las funciones</p>
        ) : (
          <div>
            <p className="text-sm opacity-90 mb-3">Acceso limitado • Actualiza para desbloquear todo</p>
            <button 
              onClick={() => setUserPlan('premium')}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm"
            >
              Actualizar a Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Community Modal Component
  const CommunityModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Comunidad de Padres</h2>
          <button 
            onClick={() => setShowCommunity(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)]">
          {/* Filtros */}
          <div className="p-4 border-b">
            <div className="flex space-x-2 overflow-x-auto">
              <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium whitespace-nowrap">
                Todos
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">
                0-6 meses
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">
                6-12 meses
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">
                1-2 años
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="p-4 space-y-4">
            {communityPosts.map(post => (
              <div key={post.id} className="border rounded-lg p-4">
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
                  <button className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Grupos populares */}
          <div className="p-4 border-t">
            <h3 className="font-bold mb-3">Grupos Populares</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Baby className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">Primeros Meses</div>
                  <div className="text-xs text-gray-600">1,234 miembros</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
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

  // Experts Modal Component
  const ExpertsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Consulta con Expertos</h2>
          <button 
            onClick={() => setShowExperts(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)]">
          {/* Diferenciación por plan */}
          <div className="p-4 bg-yellow-50 border-b">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-4 h-4 text-yellow-600" />
              <span className="font-semibold text-yellow-800">
                {userPlan === 'premium' ? 'Consultas Ilimitadas' : 'Plan Gratuito'}
              </span>
            </div>
            <p className="text-sm text-yellow-700">
              {userPlan === 'premium' 
                ? 'Acceso completo a todos los especialistas y consultas ilimitadas'
                : 'Consulta rápida gratuita disponible • Actualiza para acceso completo'
              }
            </p>
          </div>

          {/* Lista de expertos */}
          <div className="p-4 space-y-4">
            {experts.map(expert => (
              <div key={expert.id} className="border rounded-lg p-4">
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

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Disponible: {expert.nextAvailable}</span>
                  <span className="text-sm font-semibold">{expert.priceConsultation}</span>
                </div>

                {expert.isPremium && userPlan !== 'premium' ? (
                  <button className="w-full bg-yellow-100 text-yellow-800 py-2 rounded-lg font-medium text-sm">
                    Actualizar a Premium
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>Video llamada</span>
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-1">
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

  // Settings Modal Component
  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Configuración</h2>
          <button 
            onClick={() => setShowSettings(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)] p-4 space-y-4">
          {/* Idioma */}
          <div>
            <button 
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
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
              <div className="mt-2 bg-white border rounded-lg overflow-hidden">
                {['Español', 'English', 'Français', 'Português'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full p-3 text-left hover:bg-gray-50 ${
                      selectedLanguage === lang ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Zona horaria */}
          <div>
            <button 
              onClick={() => setShowTimezoneMenu(!showTimezoneMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
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
              <div className="mt-2 bg-white border rounded-lg overflow-hidden">
                {['Ciudad de México', 'Guadalajara', 'Monterrey', 'Tijuana'].map(tz => (
                  <button 
                    key={tz}
                    onClick={() => {
                      setSelectedTimezone(tz);
                      setShowTimezoneMenu(false);
                    }}
                    className={`w-full p-3 text-left hover:bg-gray-50 ${
                      selectedTimezone === tz ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    {tz}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recordatorios */}
          <div>
            <button 
              onClick={() => setShowRemindersMenu(!showRemindersMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Recordatorios</div>
                  <div className="text-sm text-gray-600">Personalizados</div>
                </div>
              </div>
              {showRemindersMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showRemindersMenu && (
              <div className="mt-2 bg-white border rounded-lg p-4 space-y-3">
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
              </div>
            )}
          </div>

          {/* Privacidad */}
          <div>
            <button 
              onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Privacidad</div>
                  <div className="text-sm text-gray-600">Configurar</div>
                </div>
              </div>
              {showPrivacyMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showPrivacyMenu && (
              <div className="mt-2 bg-white border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Compartir progreso</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Análisis de datos</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Publicidad personalizada</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            )}
          </div>

          {/* Unidades */}
          <div>
            <button 
              onClick={() => setShowUnitsMenu(!showUnitsMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Unidades</div>
                  <div className="text-sm text-gray-600">Métrico</div>
                </div>
              </div>
              {showUnitsMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showUnitsMenu && (
              <div className="mt-2 bg-white border rounded-lg overflow-hidden">
                {['Métrico (cm, kg)', 'Imperial (ft, lb)'].map(unit => (
                  <button 
                    key={unit}
                    className="w-full p-3 text-left hover:bg-gray-50 bg-blue-50 text-blue-600"
                  >
                    {unit}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gamificación */}
          <div>
            <button 
              onClick={() => setShowGamificationMenu(!showGamificationMenu)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Gamepad2 className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Gamificación</div>
                  <div className="text-sm text-gray-600">Activada</div>
                </div>
              </div>
              {showGamificationMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showGamificationMenu && (
              <div className="mt-2 bg-white border rounded-lg p-4 space-y-3">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Reports Modal Component  
  const ReportsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Reportes Detallados</h2>
          <button 
            onClick={() => setShowReports(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)] p-4 space-y-6">
          {/* Resumen ejecutivo */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
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
        </div>
      </div>
    </div>
  );

  // Main App Component
  const AppScreen = () => (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="pb-20">
        {currentSection === 'home' && <HomeScreen />}
        {currentSection === 'activities' && <ActivitiesScreen />}
        {currentSection === 'progress' && <ProgressScreen />}
        {currentSection === 'profile' && <ProfileScreen />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t">
        <div className="grid grid-cols-4 gap-1">
          <button 
            onClick={() => setCurrentSection('home')}
            className={`p-4 text-center ${
              currentSection === 'home' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Home className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Inicio</span>
          </button>
          
          <button 
            onClick={() => setCurrentSection('activities')}
            className={`p-4 text-center ${
              currentSection === 'activities' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Play className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Actividades</span>
          </button>
          
          <button 
            onClick={() => setCurrentSection('progress')}
            className={`p-4 text-center ${
              currentSection === 'progress' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <BarChart3 className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Progreso</span>
          </button>
          
          <button 
            onClick={() => setCurrentSection('profile')}
            className={`p-4 text-center ${
              currentSection === 'profile' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <User className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>

      {/* Modales */}
      {showCommunity && <CommunityModal />}
      {showExperts && <ExpertsModal />}
      {showSettings && <SettingsModal />}
      {showReports && <ReportsModal />}
      
      {/* Add Child Modal */}
      {showAddChild && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Agregar Nuevo Hijo</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg"
                  placeholder="Nombre del bebé"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowAddChild(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => setShowAddChild(false)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {currentPage === 'landing' ? <LandingPage /> : <AppScreen />}
    </div>
  );
};

export default Stimula;