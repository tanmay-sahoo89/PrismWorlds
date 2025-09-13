import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  Target,
  Users,
  Award,
  GraduationCap,
  BookOpen,
  ShoppingBag,
} from "lucide-react";
import SplineViewer from "../components/SplineViewer";
import GlassCard from "../components/GlassCard";
import LoginForm from "../components/LoginForm";
import useLandingSounds from "../hooks/useLandingSounds";

const Landing: React.FC = () => {
  const [showLogin, setShowLogin] = useState<"student" | "teacher" | null>(
    null
  );
  const { buttonProps } = useLandingSounds();

  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", { email, password, type: showLogin });
    setShowLogin(null);
    // Navigation will be handled by auth state change
  };

  const handleShopButtonClick = () => {
    setShowLogin("student");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
      {/* Hero Section with Spline Viewer */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Spline Viewer Background */}
        <div className="absolute inset-0 w-full h-full">
          <SplineViewer
            url="https://prod.spline.design/nmtpwc9al4JASbz8/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#091D23]/70 via-transparent to-[#774C3E]/50" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-[#F8D991]/20 backdrop-blur-md border border-[#F8D991]/30 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="h-5 w-5 text-[#F8D991]" />
              <span className="text-[#F8D991] font-semibold">
                Interactive Environmental Learning
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                Learn.
              </span>{" "}
              <span className="text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                Act.
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8D991] to-[#F6B080] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                Impact.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Transform environmental education through gamified learning,
              real-world challenges, and community impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex justify-center items-center"
            >
              <Link
                to="/demo"
                {...buttonProps()}
                className="group bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:ring-offset-2 focus:ring-offset-transparent"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-16 h-16 bg-[#F58B60]/20 rounded-full backdrop-blur-sm border border-[#F58B60]/30"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-32 right-16 w-12 h-12 bg-[#E1664C]/20 rounded-full backdrop-blur-sm border border-[#E1664C]/30"
        />
      </section>

      {/* Login Section */}
      <section className="py-20 bg-gradient-to-b from-[#774C3E] to-[#091D23]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8D991] to-[#F6B080]">
                Community
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your path and start making a difference today
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GlassCard
                {...buttonProps(() => setShowLogin("student"))}
                className="p-8 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#F8D991] to-[#F6B080] rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-10 w-10 text-[#091D23]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Student Login
                </h3>
                <p className="text-white/70 mb-6">
                  Access your dashboard, complete challenges, and track your
                  environmental impact
                </p>
                <div className="bg-[#E1664C]/20 text-[#E1664C] px-4 py-2 rounded-full inline-block font-semibold">
                  Click to Login
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard
                {...buttonProps(() => setShowLogin("teacher"))}
                className="p-8 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#F58B60] to-[#E1664C] rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Teacher Login
                </h3>
                <p className="text-white/70 mb-6">
                  Manage your classes, create lessons, and monitor student
                  progress
                </p>
                <div className="bg-[#E1664C]/20 text-[#E1664C] px-4 py-2 rounded-full inline-block font-semibold">
                  Click to Login
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Points Shop Preview */}
      <section className="py-20 bg-gradient-to-b from-[#091D23] to-[#774C3E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8D991] to-[#F6B080]">
                Points Shop
              </span>{" "}
              Preview
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Earn points through challenges and spend them on amazing rewards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: "Avatars",
                icon: "🎭",
                description: "Customize your profile with unique avatars",
                price: "50-200 pts",
              },
              {
                category: "Achievements",
                icon: "🏆",
                description: "Unlock special badges and titles",
                price: "100-500 pts",
              },
              {
                category: "Power-ups",
                icon: "⚡",
                description: "Boost your learning with special abilities",
                price: "25-150 pts",
              },
            ].map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.category}
                  </h3>
                  <p className="text-white/70 mb-4">{item.description}</p>
                  <div className="bg-[#F58B60]/20 text-[#F58B60] px-3 py-1 rounded-full inline-block text-sm font-semibold">
                    {item.price}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              {...buttonProps(handleShopButtonClick)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#F58B60] to-[#E1664C] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#F58B60]/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Visit Points Shop</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#774C3E] to-[#091D23]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8D991] to-[#F6B080]">
                PrismWorlds?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience environmental education like never before with our
              gamified, interactive platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Real-World Challenges",
                description:
                  "Complete hands-on environmental challenges in your community and see the direct impact of your actions.",
                color: "#F8D991",
              },
              {
                icon: Users,
                title: "Collaborative Learning",
                description:
                  "Connect with fellow eco-warriors across India, share experiences, and learn together.",
                color: "#F6B080",
              },
              {
                icon: Award,
                title: "Achievement System",
                description:
                  "Earn badges, climb leaderboards, and showcase your environmental achievements.",
                color: "#F58B60",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <GlassCard className="p-8 h-full">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: `${feature.color}20`,
                        border: `1px solid ${feature.color}30`,
                      }}
                    >
                      <Icon
                        className="h-8 w-8"
                        style={{ color: feature.color }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-[#091D23] to-[#774C3E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8D991] to-[#F6B080]">
                Impact
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Students", color: "#F8D991" },
              {
                number: "500+",
                label: "Challenges Completed",
                color: "#F6B080",
              },
              {
                number: "50+",
                label: "Schools Participating",
                color: "#E1664C",
              },
              { number: "25+", label: "States Covered", color: "#F58B60" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 text-center">
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#774C3E] to-[#091D23]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8D991] to-[#F6B080]">
                Difference?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students across India who are already making a
              positive impact on the environment.
            </p>
            <Link
              {...buttonProps()}
              to="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-[#F58B60]/25 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <LoginForm
          type={showLogin}
          onClose={() => setShowLogin(null)}
        />
      )}
    </div>
  );
};

export default Landing;
