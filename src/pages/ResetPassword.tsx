import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/inputPassword";
import logo from "@/assets/images/LogoEdificioInternacional.png";
import { Button } from "@/components/ui/button";

const ResetPassword: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-gray-100 px-4">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-xl rounded-lg p-6">
        <CardHeader className="flex flex-col items-center text-gray-600">
          <a href="/" className="flex items-center gap-2 mb-3">
            <img className="h-8" src={logo} alt="Logo" />
            <span className="text-[#0C3551] font-semibold text-lg">
              Edifício Internacional
            </span>
          </a>
          <CardDescription className="text-center text-gray-600">
            Defina sua nova senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Nova senha:</Label>
              <PasswordInput
                id="password"
                type="password"
                required
                className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirme sua senha:</Label>
              <PasswordInput
                id="confirmPassword"
                type="password"
                required
                className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-[5px] bg-blue-600 hover:bg-blue-700 transition text-white py-2 shadow-md"
            >
              Redefinir Senha
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
