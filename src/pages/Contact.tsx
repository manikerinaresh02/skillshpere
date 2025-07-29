import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically handle the form submission
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@skillsphere.com',
      description: 'We\'ll respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm PST',
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'San Francisco, CA',
      description: 'Visit us at our headquarters',
    },
    {
      icon: Clock,
      title: 'Support Hours',
      value: '24/7 Available',
      description: 'Get help anytime, anywhere',
    },
  ];

  const departments = [
    {
      name: 'Sales',
      description: 'Get pricing and plan information',
      email: 'sales@skillsphere.com',
      response: 'Within 2 hours',
    },
    {
      name: 'Support',
      description: 'Technical help and troubleshooting',
      email: 'support@skillsphere.com',
      response: 'Within 4 hours',
    },
    {
      name: 'Partnerships',
      description: 'Business development and partnerships',
      email: 'partnerships@skillsphere.com',
      response: 'Within 24 hours',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-gradient-cosmic rounded-full text-sm font-semibold text-foreground mb-6 border border-glass-border/30"
          >
            📞 Get in Touch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl lg:text-6xl font-poppins font-black mb-6"
          >
            Let's{' '}
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Connect
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Have questions about SkillSphere? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </motion.p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="container mx-auto px-6 py-16"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card text-center p-6">
                  <div className="w-12 h-12 bg-glass/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                  <p className="text-lg font-bold text-primary mb-1">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form and Departments */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="container mx-auto px-6 py-16"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Send us a Message</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="sales">Sales Question</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        rows={6} 
                        placeholder="Tell us how we can help you..."
                        required 
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-primary" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Send className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Departments */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-poppins font-bold text-foreground mb-4">
                  Contact Specific Departments
                </h3>
                <p className="text-muted-foreground mb-6">
                  Need to reach a specific team? Here's who to contact for different inquiries.
                </p>
              </div>

              {departments.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                >
                  <Card className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{dept.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
                          <p className="text-sm font-medium text-primary">{dept.email}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {dept.response}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Office Location */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="container mx-auto px-6 py-16"
        >
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-foreground mb-4">
                    Visit Our Office
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Located in the heart of San Francisco's tech district, our office is easily accessible and open for meetings by appointment.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="text-sm">SkillSphere HQ</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm">123 Tech Street, San Francisco, CA 94105</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">Mon-Fri: 9:00 AM - 6:00 PM PST</span>
                    </div>
                  </div>
                </div>
                <div className="bg-glass/20 rounded-lg p-6 text-center">
                  <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🏢</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Schedule a Visit</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book a meeting with our team
                  </p>
                  <Button className="btn-primary">
                    Book Meeting
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="container mx-auto px-6 py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-poppins font-black mb-4">
              Frequently Asked{' '}
              <span className="text-glow bg-gradient-secondary bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: 'How quickly do you respond to inquiries?',
                answer: 'We typically respond to all inquiries within 24 hours, with most getting a response within 4-6 hours during business hours.',
              },
              {
                question: 'Do you offer demos for enterprise customers?',
                answer: 'Yes, we provide personalized demos for enterprise customers. Contact our sales team to schedule a demo.',
              },
              {
                question: 'Can I get technical support over the phone?',
                answer: 'Yes, we offer phone support for all paid plans. Free users can access our knowledge base and community forums.',
              },
              {
                question: 'What information should I include in my message?',
                answer: 'Please include your name, company, specific questions or requirements, and any relevant context to help us assist you better.',
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
              >
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact; 