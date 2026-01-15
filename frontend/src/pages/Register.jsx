import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const USERNAME_REGEXP = new RegExp("^[A-Za-z_][A-Za-z0-9_]{2,19}$");
    const EMAIL_REGEXP = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const PASSWORD_REGEXP = /^.{8,}$/;

    if (!username || !email || !password || !confirmPassword) return setError("all fields are required!");
    if (!USERNAME_REGEXP.test(username)) return setError("please enter a valid username!");
    if (!EMAIL_REGEXP.test(email)) return setError("please enter a valid email!");
    if (!PASSWORD_REGEXP.test(password)) return setError("weak password!");
    if (password !== confirmPassword) return setError("password don't match!");

    try {
      await register(username, email, password);
      toast.success("account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || "account creation failed, please try again later!");
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-svh p-6 md:p-10">
      <div className="max-w-sm w-full">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your information below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    type="text"
                    id="username"
                    placeholder="example123"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    type="email"
                    id="email"
                    placeholder="example@example.example"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    type="password"
                    id="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </Field>

                <Field>
                  <Button type="submit" disabled={loading}>
                    {loading && <Spinner />}
                    <span>Create account</span>
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account? <Link to="/">Sign in</Link>
                  </FieldDescription>
                  <FieldError>{error && <p>{error}</p>}</FieldError>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
