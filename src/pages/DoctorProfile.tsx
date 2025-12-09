import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Building2, Video, Award, ChevronLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sampleDoctors } from '@/data/sampleData';
import { useApp } from '@/contexts/AppContext';

export function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useApp();
  const doctor = sampleDoctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Doctor not found</h1>
        <Link to="/doctors">
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Doctors
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/doctors">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Doctors
          </Button>
        </Link>
      </div>

      {/* Doctor Header */}
      <div className="gradient-soft py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-32 h-32 rounded-2xl object-cover shadow-card"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-foreground">{doctor.name}</h1>
              <p className="text-muted-foreground mt-1">{doctor.clinic}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center gap-1 text-accent">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Award className="w-5 h-5" />
                  <span>{doctor.experience}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                {doctor.visitTypes.includes('in-clinic') && (
                  <Badge variant="soft">
                    <Building2 className="w-4 h-4 mr-1" />
                    In-Clinic
                  </Badge>
                )}
                {doctor.visitTypes.includes('video') && (
                  <Badge variant="soft">
                    <Video className="w-4 h-4 mr-1" />
                    Video Consultation
                  </Badge>
                )}
                {doctor.acceptingBookings && (
                  <Badge variant="success">Accepting Bookings</Badge>
                )}
              </div>
            </div>

            <div className="w-full md:w-auto">
              <Link to={isAuthenticated ? `/booking?doctor=${doctor.id}` : '/auth?mode=signup'}>
                <Button variant="hero" size="lg" className="w-full md:w-auto">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Specializations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-sm py-1.5 px-3">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Dr. {doctor.name.split(' ').slice(1).join(' ')} is a highly experienced veterinarian 
                    with {doctor.experience} of practice. Specializing in {doctor.specializations.slice(0, 2).join(' and ')}, 
                    they are known for their compassionate approach to pet care and thorough diagnostic methods.
                    Currently practicing at {doctor.clinic}.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Clinic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="soft">
                <CardHeader>
                  <CardTitle className="text-lg">Clinic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{doctor.clinic}</p>
                      <p className="text-sm text-muted-foreground">Main Location</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Mon - Sat</p>
                      <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Available Slots Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Available This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {doctor.availableSlots.slice(0, 3).map((slot) => (
                      <div key={slot.date} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {slot.times.length} slots
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link to={isAuthenticated ? `/booking?doctor=${doctor.id}` : '/auth?mode=signup'}>
                    <Button variant="outline" className="w-full mt-4">
                      View All Slots
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
