"use client"
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import Link from "next/link";

export default function SignInConfirmation() {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSuccess(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main Card */}
                <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0 ring-1 ring-black/5">
                    <CardHeader className="text-center pb-4">
                        {/* Animated Icon */}
                        <div className="mx-auto mb-4 relative">
                            <div className={`w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center transition-all duration-500 ${showSuccess ? 'scale-100 opacity-100' : 'scale-75 opacity-60'}`}>
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                            {showSuccess && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                            )}
                            {/* Pulse rings */}
                            <div className="absolute inset-0 w-16 h-16 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                            <div className="absolute inset-2 w-12 h-12 bg-indigo-500 rounded-full animate-ping opacity-30 animation-delay-200"></div>
                        </div>

                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Check Your Email
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-base mt-2">
                            {`We've sent a secure sign-in link to your email address`}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Success Alert */}
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800 font-medium">
                                A sign-in link has been sent to your email address.
                            </AlertDescription>
                        </Alert>

                        {/* Instructions */}
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-600 font-semibold text-xs">1</span>
                                </div>
                                <p>Check your email inbox (and spam folder)</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-600 font-semibold text-xs">2</span>
                                </div>
                                <p>Click the secure sign-in link in the email</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-600 font-semibold text-xs">3</span>
                                </div>
                                <p>{`You'll be automatically signed in`}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">

                            <Button
                                variant="ghost"
                                className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                                asChild
                            >
                                <Link href={"/login"}>
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Sign In
                                </Link>
                            </Button>
                        </div>

                        {/* Help Text */}
                        <div className="text-center pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500">
                                {`Didn't receive the email? Check your spam folder or try again`}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Need help? <button className="text-blue-600 hover:text-blue-800 underline transition-colors">Contact Support</button>
                    </p>
                </div>
            </div>
        </div>
    );
}