import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ClipboardList, MessageCircle, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-soft" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm font-semibold mb-6"
            >
              <Heart className="w-4 h-4" />
              Caring for your furry friends
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Your Pet's Health,{' '}
              <span className="text-gradient">Clearly Communicated</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Book appointments and share your pet's condition clearly with your vet. 
              No more guesswork – give your veterinarian the complete picture before your visit.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/doctors">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  View Vets
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span>100+ Verified Vets</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span>Secure & Private</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything Your Vet Needs to Know
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              PAXI helps you provide structured, complete information about your pet's condition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Pet Profile',
                description:
                  'Create a detailed profile for your pet including medical history, vaccinations, and regular medications.',
                color: 'text-secondary',
                bg: 'bg-secondary-light',
              },
              {
                icon: ClipboardList,
                title: 'Structured Intake',
                description:
                  'Answer guided questions about symptoms, timeline, and severity. Upload photos for a complete picture.',
                color: 'text-primary',
                bg: 'bg-primary-light',
              },
              {
                icon: MessageCircle,
                title: 'Chat Support',
                description:
                  'Get help navigating the app and preparing for your appointment. Note: This is assistance, not diagnosis.',
                color: 'text-accent',
                bg: 'bg-accent-light',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="interactive" className="h-full">
                  <CardContent className="p-8">
                    <div
                      className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}
                    >
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How PAXI Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to better vet visits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Create Your Profile',
                description:
                  "Add your pet's details, medical history, and photos to build a complete profile.",
              },
              {
                step: '2',
                title: 'Book & Describe',
                description:
                  'Choose a vet, select a time, and answer structured questions about your concern.',
              },
              {
                step: '3',
                title: 'Vet Reviews',
                description:
                  'Your vet receives organized information to prepare for your appointment.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="w-16 h-16 rounded-full gradient-hero text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-card">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-6 h-6 text-accent fill-current"
                />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-foreground font-medium mb-6">
              "PAXI made it so much easier to explain what was wrong with my dog. 
              The vet already knew everything before we walked in!"
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                <span className="text-primary font-bold">PR</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Priya R.</p>
                <p className="text-sm text-muted-foreground">Pet Parent</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                About PAXI
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated">
                <CardContent className="p-8 md:p-12">
                  <p className="text-lg text-muted-foreground mb-6">
                    PAXI was created with a simple mission: to bridge the communication gap between pet parents and veterinarians. 
                    We understand that when your furry friend isn't feeling well, it can be hard to remember all the details or 
                    describe symptoms accurately.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our platform guides you through structured questions, helping you capture the complete picture of your pet's 
                    condition. This means your vet can prepare better, appointments are more productive, and your pet gets 
                    the care they deserve faster.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We're not here to replace your vet or provide diagnoses – we're here to make every vet visit count. 
                    Because every moment matters when it comes to the ones we love.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Make Vet Visits Easier?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of pet parents who are already using PAXI to communicate better with their vets.
            </p>
            <Link to="/auth?mode=signup">
              <Button
                variant="warm"
                size="xl"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
