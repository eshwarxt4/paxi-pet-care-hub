import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Heart, 
  Search, 
  MessageCircle, 
  History, 
  Settings,
  ChevronRight,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { sampleDoctors } from '@/data/sampleData';

export function Dashboard() {
  const { isAuthenticated, owner, pets, appointments, currentPetId, toggleChat } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const currentPet = pets.find((p) => p.id === currentPetId);
  const activeAppointment = appointments.find((a) => a.status === 'approved' || a.status === 'pending');
  const activeDoctor = activeAppointment
    ? sampleDoctors.find((d) => d.id === activeAppointment.doctorId)
    : null;

  const quickActions = [
    { icon: Heart, label: 'My Pets', href: '/pets', color: 'text-secondary', bg: 'bg-secondary-light' },
    { icon: Search, label: 'Find Doctors', href: '/doctors', color: 'text-primary', bg: 'bg-primary-light' },
    { icon: MessageCircle, label: 'Chat with PAXI', action: toggleChat, color: 'text-accent', bg: 'bg-accent-light' },
    { icon: History, label: 'History', href: '/history', color: 'text-success', bg: 'bg-success-light' },
    { icon: Settings, label: 'Settings', href: '/settings', color: 'text-muted-foreground', bg: 'bg-muted' },
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-soft py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Hi {owner?.name.split(' ')[0]} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! How can we help you today?
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Active Pet Card */}
        {currentPet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="elevated" className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 md:h-auto">
                  <img
                    src={currentPet.photos[0]}
                    alt={currentPet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{currentPet.name}</h2>
                      <p className="text-muted-foreground">
                        {currentPet.breed} • {currentPet.age}
                      </p>
                    </div>
                    <Badge variant="success">{currentPet.vaccinationStatus}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="ml-2 font-medium">{currentPet.weight}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sex:</span>
                      <span className="ml-2 font-medium">{currentPet.sex}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link to={`/pets/${currentPet.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Link to={`/pets/${currentPet.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Book Appointment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/booking">
            <Card variant="interactive" className="gradient-hero text-primary-foreground p-6 border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Book Appointment</h3>
                    <p className="text-primary-foreground/80">Find a vet and schedule a visit</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6" />
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Active Appointment */}
        {activeAppointment && activeDoctor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="soft">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Upcoming Appointment</CardTitle>
                  <Badge variant={activeAppointment.status === 'approved' ? 'success' : 'warning'}>
                    {activeAppointment.status === 'approved' ? 'Approved' : 'Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <img
                    src={activeDoctor.avatar}
                    alt={activeDoctor.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{activeDoctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{activeDoctor.clinic}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {activeAppointment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {activeAppointment.visitType === 'in-clinic' ? 'In-Clinic' : 'Video Call'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Link to={`/appointments/${activeAppointment.id}`} className="flex-1">
                    <Button variant="default" className="w-full">View Details</Button>
                  </Link>
                  {activeAppointment.status === 'approved' && !activeAppointment.onboardingTest && (
                    <Link to="/onboarding-test" className="flex-1">
                      <Button variant="warm" className="w-full">Complete Questionnaire</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              action.href ? (
                <Link key={action.label} to={action.href}>
                  <Card variant="interactive" className="text-center p-4">
                    <div className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center mx-auto mb-3`}>
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <p className="text-sm font-medium text-foreground">{action.label}</p>
                  </Card>
                </Link>
              ) : (
                <button key={action.label} onClick={action.action} className="w-full">
                  <Card variant="interactive" className="text-center p-4">
                    <div className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center mx-auto mb-3`}>
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <p className="text-sm font-medium text-foreground">{action.label}</p>
                  </Card>
                </button>
              )
            ))}
          </div>
        </motion.div>

        {/* No pets message */}
        {pets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="soft" className="text-center p-8">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Pets Added Yet</h3>
              <p className="text-muted-foreground mb-6">
                Add your first pet to get started with booking appointments
              </p>
              <Link to="/pets/new">
                <Button variant="hero">Add Your Pet</Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
