"use client";
import { useState } from "react";

export default function ClientC() {
	const [s, setS] = useState(0);

	return <button onClick={() => setS(s + 1)}>Client C {s}</button>;
}
