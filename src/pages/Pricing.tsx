import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Star, Zap, Crown, Users, Building } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals starting their career journey',
      price: { monthly: 0, annual: 0 },
      features: [
        'Basic skill tracking',
        'Limited market insights',
        '5 skills per month',
        'Basic job recommendations',
        'Community access',
        'Email support',
      ],
      icon: Users,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/20',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Ideal for active professionals seeking career growth',
      price: { monthly: 29, annual: 290 },
      features: [
        'Advanced skill tracking',
        'Full market insights',
        'Unlimited skills',
        'AI-powered recommendations',
        'Learning path customization',
        'Priority support',
        'Advanced analytics',
        'Job application tracking',
      ],
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For teams and organizations with advanced needs',
      price: { monthly: 99, annual: 990 },
      features: [
        'Everything in Professional',
        'Team collaboration tools',
        'Custom learning paths',
        'Advanced reporting',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'White-label options',
      ],
      icon: Crown,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      popular: false,
    },
  ];

  const getCurrentPrice = (plan: any) => {
    return isAnnual ? plan.price.annual : plan.price.monthly;
  };

  const getSavings = (plan: any) => {
    if (plan.price.monthly === 0) return 0;
    const annualCost = plan.price.monthly * 12;
    const annualPrice = plan.price.annual;
    return Math.round(((annualCost - annualPrice) / annualCost) * 100);
  };

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
            💰 Simple Pricing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl lg:text-6xl font-poppins font-black mb-6"
          >
            Choose Your{' '}
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Plan
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Start free and upgrade as you grow. All plans include our core features with no hidden fees.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center space-x-4 mb-8"
          >
            <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-primary text-primary-foreground">
                Save up to 20%
              </Badge>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="container mx-auto px-6 py-16"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`glass-card h-full relative ${
                  plan.popular 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'hover:bg-glass/30'
                } transition-all duration-300`}>
                  <CardHeader className="text-center pb-6">
                    <div className={`w-12 h-12 ${plan.bgColor} ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl font-poppins font-bold">
                      {plan.name}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Pricing */}
                    <div className="text-center">
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-4xl font-poppins font-black text-foreground">
                          ${getCurrentPrice(plan)}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-muted-foreground">
                            /{isAnnual ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      {plan.price.monthly > 0 && isAnnual && (
                        <p className="text-sm text-secondary mt-1">
                          Save ${plan.price.monthly * 12 - plan.price.annual}/year
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-3">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'btn-primary' 
                          : 'glass-card hover:bg-glass/30'
                      }`}
                    >
                      {plan.price.monthly === 0 ? 'Get Started Free' : 'Choose Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Can I change my plan anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes, you can start with our free plan and upgrade when you need more features.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
              },
              {
                question: 'Can I cancel my subscription?',
                answer: 'Yes, you can cancel your subscription at any time. No long-term contracts required.',
              },
              {
                question: 'Do you offer team discounts?',
                answer: 'Yes, we offer special pricing for teams of 5+ users. Contact us for details.',
              },
              {
                question: 'Is my data secure?',
                answer: 'Absolutely. We use enterprise-grade security and never share your personal data.',
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="container mx-auto px-6 py-16"
        >
          <Card className="glass-card text-center p-12">
            <h2 className="text-3xl font-poppins font-black mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already using SkillSphere to accelerate their career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-4">
                Start Free Trial
              </Button>
              <Button variant="outline" className="glass-card text-lg px-8 py-4">
                Contact Sales
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing; 