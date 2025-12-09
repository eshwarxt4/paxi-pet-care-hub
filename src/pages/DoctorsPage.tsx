import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Video, Building2, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sampleDoctors, Doctor } from '@/data/sampleData';
import { useApp } from '@/contexts/AppContext';

export function DoctorsPage() {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'in-clinic' | 'video'>('all');

  const filteredDoctors = sampleDoctors.filter((doctor) => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = 
      filterType === 'all' || 
      doctor.visitTypes.includes(filterType);

    return matchesSearch && matchesType;
  });

  const handleBooking = (doctor: Doctor) => {
    if (isAuthenticated) {
      navigate(`/booking?doctor=${doctor.id}`);
    } else {
      navigate('/auth?mode=signup');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-soft py-8 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Find Your Vet
            </h1>
            <p className="text-muted-foreground">
              Browse our network of verified veterinarians and book your appointment
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto mt-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, clinic, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
                variant="filled"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 pb-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
          >
            All Doctors
          </Button>
          <Button
            variant={filterType === 'in-clinic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('in-clinic')}
          >
            <Building2 className="w-4 h-4 mr-1" />
            In-Clinic
          </Button>
          <Button
            variant={filterType === 'video' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('video')}
          >
            <Video className="w-4 h-4 mr-1" />
            Video Consultation
          </Button>
        </motion.div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card variant="elevated" className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{doctor.clinic}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-accent">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-semibold text-sm">{doctor.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({doctor.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {doctor.experience} experience
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doctor.specializations.slice(0, 3).map((spec) => (
                        <Badge key={spec} variant="soft" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    {doctor.visitTypes.includes('in-clinic') && (
                      <Badge variant="outline" className="text-xs">
                        <Building2 className="w-3 h-3 mr-1" />
                        In-Clinic
                      </Badge>
                    )}
                    {doctor.visitTypes.includes('video') && (
                      <Badge variant="outline" className="text-xs">
                        <Video className="w-3 h-3 mr-1" />
                        Video
                      </Badge>
                    )}
                  </div>

                  {doctor.acceptingBookings && (
                    <Badge variant="success" className="mt-3">
                      Accepting Bookings
                    </Badge>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Link to={`/doctors/${doctor.id}`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Button
                      variant="default"
                      className="flex-1"
                      size="sm"
                      onClick={() => handleBooking(doctor)}
                    >
                      Book
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No doctors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
