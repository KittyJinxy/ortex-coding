import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, TrendingUp } from "lucide-react";

export function LoginPage() {
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
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Live</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">--</span>
                  <span className="text-lg opacity-90">USD</span>
                </div>
                <p className="text-xs opacity-80 font-medium">
                  Last updated: --
                </p>
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
            <form className="space-y-5">
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
                    className="w-full pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#38ada8] focus:ring-[#38ada8]"
                    required
                  />
                </div>
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
                    className="w-full pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#38ada8] focus:ring-[#38ada8]"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  className="text-sm text-[#38ada8] hover:text-[#2d8a85] transition-colors font-semibold"
                  onClick={() => {
                    // Will be connected to modal in step 7
                    console.log("Reset password clicked");
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <Button
                className="w-full bg-[#38ada8] hover:bg-[#2d8a85] text-white font-semibold shadow-lg h-12 text-base"
                type="submit"
                size="lg"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
