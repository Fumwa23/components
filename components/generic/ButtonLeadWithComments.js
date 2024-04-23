"use client";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import apiClient from "@/utils/generic/api";

// This component is used to collect the emails from the landing page
// You'd use this if your product isn't ready yet or you want to collect leads
// For instance: A popup to send a freebie, joining a waitlist, etc.
// It calls the /api/lead/route.js route and store a Lead document in the database
const ButtonLeadWithComments = ({ extraStyle }) => {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    setIsLoading(true);
    try {
      await apiClient.post("/leadAdvanced", { name, email });

      toast.success("Thanks for your interest! We'll be in touch soon.");

      // just remove the focus on the input
      inputRef.current.blur();
      setEmail("");
      setName("");
      setIsDisabled(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className={`w-full max-w-xs space-y-3 ${extraStyle ? extraStyle : ""}`}
      onSubmit={handleSubmit}
    >

      {isDisabled? null
      :
      <div>
        <input
            required
            type="text"
            value={name}
            ref={inputRef}
            autoComplete="name"
            placeholder="Tom Cruise"
            className="input input-bordered w-full text-black mb-4 placeholder:opacity-60"
            onChange={(e) => setName(e.target.value)}
        />
        <label
            for="Name"
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
            <input
                type="text"
                id="Name"
                class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                value={name}
                ref={inputRef}
                autoComplete="name"
                placeholder="Tom Cruise"
                onChange={(e) => setName(e.target.value)}
            />

            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
                Name
            </span>
        </label>

        <input
            required
            type="email"
            value={email}
            ref={inputRef}
            autoComplete="email"
            placeholder="tom@cruise.com"
            className="input input-bordered w-full text-black placeholder:opacity-60"
            onChange={(e) => setEmail(e.target.value)}
        />
      </div> 
      
      }
      <button
        className="btn btn-primary btn-block disabled:text-white disabled:bg-green-400 disabled:cursor-not-allowed"
        type="submit"
        disabled={isDisabled}
      >
        {isDisabled? "We will be in touch." : "Contact us"}
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          null
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   viewBox="0 0 20 20"
          //   fill="currentColor"
          //   className="w-5 h-5"
          // >
          //   <path
          //     fillRule="evenodd"
          //     d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
          //     clipRule="evenodd"
          //   />
          // </svg>
        )}
      </button>
    </form>
  );
};

export default ButtonLeadWithComments;