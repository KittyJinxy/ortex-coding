import { useState } from "react";
import type { FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Lock,
  TrendingUp,
  AlertCircle,
  Mail,
  CheckCircle,
} from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";

interface FormErrors {
  username?: string;
  password?: string;
  submit?: string;
}

interface ResetPasswordErrors {
  email?: string;
  submit?: string;
}

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetErrors, setResetErrors] = useState<ResetPasswordErrors>({});
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { price, timestamp, isConnected, error: wsError } = useWebSocket();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setErrors({
          submit:
            errorData.message || "Login failed. Please check your credentials.",
        });
        return;
      }

      // Success - in a real app, you would handle the response here
      const data = await response.json();
      console.log("Login successful:", data);
      // You could redirect or update app state here
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateResetForm = (): boolean => {
    const newErrors: ResetPasswordErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!resetEmail.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(resetEmail.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setResetErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResetErrors({});
    setResetSuccess(false);

    if (!validateResetForm()) {
      return;
    }

    setIsResetLoading(true);

    try {
      // In a real app, this would call your reset password endpoint
      // For now, we'll simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResetSuccess(true);
      setResetEmail("");

      // Close modal after 2 seconds
      setTimeout(() => {
        setIsResetModalOpen(false);
        setResetSuccess(false);
      }, 2000);
    } catch (error) {
      setResetErrors({
        submit:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleOpenResetModal = () => {
    setIsResetModalOpen(true);
    setResetEmail("");
    setResetErrors({});
    setResetSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-2xl border-slate-700/30 bg-slate-900/80 backdrop-blur-xl">
          <CardHeader className="space-y-6 pb-6">
            {/* Exchange Rate Section - Top */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#38ada8] to-[#2d8a85] rounded-xl p-5 text-white shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <p className="text-sm font-semibold uppercase tracking-wide">
                      EUR/USD
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isConnected
                          ? "bg-green-400 animate-pulse"
                          : "bg-yellow-400"
                      }`}
                    ></div>
                    <span className="text-xs font-medium">
                      {isConnected ? "Live" : "Connecting..."}
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">
                    {price !== null ? price.toFixed(4) : "--"}
                  </span>
                  <span className="text-lg opacity-90">USD</span>
                </div>
                <p className="text-xs opacity-80 font-medium">
                  Last updated: {timestamp || "--"}
                </p>
                {wsError && (
                  <p className="text-xs text-yellow-200 mt-1">{wsError}</p>
                )}
              </div>
            </div>

            {/* Header */}
            <div className="space-y-3 text-center">
              <h1 className="text-4xl font-bold text-[#38ada8] tracking-tight">
                ORTEX
              </h1>
              <CardTitle className="text-2xl font-bold text-white">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Sign in to your account to continue
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-semibold text-slate-300"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errors.username) {
                        setErrors({ ...errors, username: undefined });
                      }
                    }}
                    className={`w-full pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#38ada8] focus:ring-[#38ada8] ${
                      errors.username
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.username && (
                  <div className="flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.username}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors({ ...errors, password: undefined });
                      }
                    }}
                    className={`w-full pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#38ada8] focus:ring-[#38ada8] ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>
              {errors.submit && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-red-400">{errors.submit}</span>
                </div>
              )}
              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  className="text-sm text-[#38ada8] hover:text-[#2d8a85] transition-colors font-semibold disabled:opacity-50"
                  onClick={handleOpenResetModal}
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>
              <Button
                className="w-full bg-[#38ada8] hover:bg-[#2d8a85] text-white font-semibold shadow-lg h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Reset Password Modal */}
      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Reset Password
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your email address and we'll send you a link to reset your
              password.
            </DialogDescription>
          </DialogHeader>
          {resetSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-white">
                  Email sent successfully!
                </p>
                <p className="text-sm text-slate-400">
                  Please check your inbox for password reset instructions.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="reset-email"
                  className="text-sm font-semibold text-slate-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                      if (resetErrors.email) {
                        setResetErrors({ ...resetErrors, email: undefined });
                      }
                    }}
                    className={`w-full pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-[#38ada8] focus:ring-[#38ada8] ${
                      resetErrors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    disabled={isResetLoading}
                    autoFocus
                  />
                </div>
                {resetErrors.email && (
                  <div className="flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{resetErrors.email}</span>
                  </div>
                )}
              </div>
              {resetErrors.submit && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-red-400">
                    {resetErrors.submit}
                  </span>
                </div>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsResetModalOpen(false)}
                  disabled={isResetLoading}
                  className="border-slate-600 text-slate-700 bg-slate-300 hover:bg-slate-700 hover:text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isResetLoading}
                  className="bg-[#38ada8] hover:bg-[#2d8a85] text-white"
                >
                  {isResetLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
