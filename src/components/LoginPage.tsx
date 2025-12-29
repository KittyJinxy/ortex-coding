import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-slate-700/50 bg-slate-800/90 backdrop-blur-lg">
          <CardHeader className="space-y-4 pb-4">
            {/* Exchange Rate Section - Top */}
            <div className="bg-[#38ada8] rounded-lg p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium opacity-95">EUR/USD</p>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">--</span>
                <span className="text-sm opacity-90">USD</span>
              </div>
              <p className="text-xs opacity-80 mt-2">Last updated: --</p>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-center">
                <h1 className="text-3xl font-bold text-[#38ada8]">ORTEX</h1>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-white">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-slate-400">
                Sign in to your account to continue
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-semibold text-slate-200"
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="w-full bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#38ada8] focus:ring-[#38ada8]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-200"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#38ada8] focus:ring-[#38ada8]"
                  required
                />
              </div>
              <div className="flex items-center justify-end">
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
                className="w-full bg-[#38ada8] hover:bg-[#2d8a85] text-white font-semibold shadow-lg"
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
