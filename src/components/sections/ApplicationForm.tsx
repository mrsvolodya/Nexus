"use client";

import { useRef, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { applicationSchema, type ApplicationInput } from "@/lib/schemas";
import {
  ROLES,
  EXPERIENCE_RANGES,
  ENGLISH_LEVELS,
  AVAILABILITY_OPTIONS,
} from "@/data/options";
import { Reveal } from "@/components/effects/Reveal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    mode: "onBlur",
  });

  const motivationValue = watch("motivation") ?? "";
  const cvFileList = watch("cv");
  const cvFile = cvFileList && cvFileList.length > 0 ? cvFileList[0] : null;

  const onSubmit = async (values: ApplicationInput) => {
    // In production, post to /api/apply with FormData. Here we simulate.
    await new Promise((r) => setTimeout(r, 900));
    // eslint-disable-next-line no-console
    console.log("[Nexus] application submitted:", {
      ...values,
      cv: cvFile ? { name: cvFile.name, size: cvFile.size } : null,
    });
    setSubmitted(true);
    reset();
  };

  return (
    <section
      id="apply"
      className="relative section-padding"
      aria-labelledby="apply-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-mesh-1 opacity-40 blur-3xl"
      />

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="chip">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Candidate application
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="apply-title"
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Join the <span className="gradient-text">Nexus network</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-white/60 sm:text-lg">
              Tell us about yourself. We read every application. You&apos;ll
              hear back within 5 business days.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessState key="success" onReset={() => setSubmitted(false)} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="grid gap-5 sm:grid-cols-2"
                  aria-describedby="apply-title"
                >
                  <Field
                    id="firstName"
                    label="First name"
                    required
                    error={errors.firstName?.message}
                  >
                    <Input
                      placeholder="Ada"
                      autoComplete="given-name"
                      invalid={!!errors.firstName}
                      {...register("firstName")}
                    />
                  </Field>

                  <Field
                    id="lastName"
                    label="Last name"
                    required
                    error={errors.lastName?.message}
                  >
                    <Input
                      placeholder="Lovelace"
                      autoComplete="family-name"
                      invalid={!!errors.lastName}
                      {...register("lastName")}
                    />
                  </Field>

                  <Field
                    id="email"
                    label="Email"
                    required
                    error={errors.email?.message}
                  >
                    <Input
                      type="email"
                      inputMode="email"
                      placeholder="you@domain.com"
                      autoComplete="email"
                      invalid={!!errors.email}
                      {...register("email")}
                    />
                  </Field>

                  <Field
                    id="contact"
                    label="Telegram or phone"
                    required
                    hint="@handle or +country phone — whichever you prefer."
                    error={errors.contact?.message}
                  >
                    <Input
                      placeholder="@ada or +1 555 0100"
                      autoComplete="tel"
                      invalid={!!errors.contact}
                      {...register("contact")}
                    />
                  </Field>

                  <Field
                    id="location"
                    label="Location"
                    required
                    error={errors.location?.message}
                  >
                    <Input
                      placeholder="Lisbon, Portugal"
                      autoComplete="address-level2"
                      invalid={!!errors.location}
                      {...register("location")}
                    />
                  </Field>

                  <Field
                    id="role"
                    label="Desired role"
                    required
                    error={errors.role?.message}
                  >
                    <Select invalid={!!errors.role} {...register("role")} defaultValue="">
                      <option value="" disabled>
                        Select a role
                      </option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field
                    id="experience"
                    label="Years of experience"
                    required
                    error={errors.experience?.message}
                  >
                    <Select
                      invalid={!!errors.experience}
                      {...register("experience")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select experience
                      </option>
                      {EXPERIENCE_RANGES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field
                    id="englishLevel"
                    label="English level"
                    required
                    error={errors.englishLevel?.message}
                  >
                    <Select
                      invalid={!!errors.englishLevel}
                      {...register("englishLevel")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select level
                      </option>
                      {ENGLISH_LEVELS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field
                    id="primaryStack"
                    label="Primary tech stack"
                    required
                    hint="The stack you'd ship production code with tomorrow."
                    error={errors.primaryStack?.message}
                    className="sm:col-span-2"
                  >
                    <Input
                      placeholder="e.g. TypeScript, React, Next.js, PostgreSQL"
                      invalid={!!errors.primaryStack}
                      {...register("primaryStack")}
                    />
                  </Field>

                  <Field
                    id="secondaryStack"
                    label="Secondary technologies"
                    hint="Anything else you're comfortable with."
                    error={errors.secondaryStack?.message}
                    className="sm:col-span-2"
                  >
                    <Input
                      placeholder="e.g. Go, Python, Docker, AWS"
                      {...register("secondaryStack")}
                    />
                  </Field>

                  <Field
                    id="availability"
                    label="Availability"
                    required
                    error={errors.availability?.message}
                  >
                    <Select
                      invalid={!!errors.availability}
                      {...register("availability")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select availability
                      </option>
                      {AVAILABILITY_OPTIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field
                    id="rate"
                    label="Expected salary or rate"
                    required
                    hint="Ballpark is fine — monthly salary or hourly rate."
                    error={errors.rate?.message}
                  >
                    <Input
                      placeholder="$6,500 / month or $55 / hour"
                      invalid={!!errors.rate}
                      {...register("rate")}
                    />
                  </Field>

                  <Field
                    id="linkedin"
                    label="LinkedIn"
                    error={errors.linkedin?.message}
                  >
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/in/…"
                      autoComplete="url"
                      invalid={!!errors.linkedin}
                      {...register("linkedin")}
                    />
                  </Field>

                  <Field
                    id="github"
                    label="GitHub"
                    error={errors.github?.message}
                  >
                    <Input
                      type="url"
                      placeholder="https://github.com/…"
                      autoComplete="url"
                      invalid={!!errors.github}
                      {...register("github")}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <CvUpload
                      file={cvFile ?? null}
                      error={errors.cv?.message as string | undefined}
                      register={register("cv")}
                      onClear={() => setValue("cv", undefined, { shouldValidate: true })}
                    />
                  </div>

                  <Field
                    id="motivation"
                    label="Why do you want to join Nexus?"
                    required
                    hint={`${motivationValue.length}/1200 characters`}
                    error={errors.motivation?.message}
                    className="sm:col-span-2"
                  >
                    <Textarea
                      rows={5}
                      maxLength={1200}
                      placeholder="What kind of work fires you up? What are you looking for next?"
                      invalid={!!errors.motivation}
                      {...register("motivation")}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                      <input
                        type="checkbox"
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-input text-primary focus:ring-ring/60",
                          errors.consent && "ring-1 ring-destructive/60",
                        )}
                        {...register("consent")}
                      />
                      <span>
                        I consent to Nexus processing my data for recruitment
                        purposes in line with their{" "}
                        <a
                          href="#"
                          className="text-primary underline-offset-2 hover:underline"
                        >
                          privacy policy
                        </a>
                        .
                      </span>
                    </label>
                    {errors.consent?.message && (
                      <p className="mt-1.5 text-xs text-destructive">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-stretch gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-white/50">
                      Fields marked with <span className="text-primary">*</span>{" "}
                      are required.
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="min-w-[200px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>Submit application</>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CvUpload({
  file,
  error,
  register,
  onClear,
}: {
  file: File | null;
  error?: string;
  register: UseFormRegisterReturn;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-white/80">CV (PDF or Word)</span>

      <label
        htmlFor="cv"
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-white/[0.03] px-6 py-8 text-center transition-colors",
          error
            ? "border-destructive/50 bg-destructive/5"
            : "border-white/15 hover:border-primary/40 hover:bg-white/[0.05]",
        )}
      >
        <input
          id="cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          ref={(node) => {
            ref(node);
            inputRef.current = node;
          }}
          {...rest}
        />

        {file ? (
          <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-lg border border-white/10 bg-background/60 px-3 py-2.5 text-left">
            <span className="flex min-w-0 items-center gap-2.5">
              <FileText
                className="h-5 w-5 shrink-0 text-primary"
                aria-hidden
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm text-white">
                  {file.name}
                </span>
                <span className="text-xs text-white/50">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </span>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onClear();
              }}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
              aria-label="Remove CV"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <Upload className="h-4 w-4 text-primary" aria-hidden />
            </span>
            <span className="text-sm text-white/80">
              Drop your CV here or{" "}
              <span className="text-primary underline-offset-2 hover:underline">
                browse
              </span>
            </span>
            <span className="text-xs text-white/50">
              PDF or Word · up to 8MB
            </span>
          </>
        )}
      </label>

      <div className="min-h-[18px]">
        {error && (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center gap-5 px-4 py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <motion.span
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-400/20 to-primary/20 ring-1 ring-emerald-400/30"
      >
        <CheckCircle2 className="h-7 w-7 text-emerald-300" aria-hidden />
      </motion.span>
      <h3 className="font-display text-2xl font-semibold tracking-tight">
        Application received
      </h3>
      <p className="max-w-md text-sm text-white/60">
        Thanks for applying to Nexus. A member of our team will review your
        profile and reach out within 5 business days.
      </p>
      <Button variant="secondary" size="sm" onClick={onReset}>
        Submit another application
      </Button>
    </motion.div>
  );
}
