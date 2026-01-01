"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: "user" })
    });

    router.push("/auth/login");
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={register} style={styles.button}>
        Register
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: 300,
    margin: "100px auto",
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  input: {
    padding: 8,
    fontSize: 14
  },
  button: {
    padding: 10,
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};
