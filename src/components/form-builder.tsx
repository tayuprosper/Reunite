import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler, Path } from "react-hook-form";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "checkbox"
  | "file"
  | "date"
  | "select";

export interface FormField {
  name: Path<Record<string, string>>;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}

export interface FormBuilderProps<T> {
  fields: FormField[];
  onSubmit: SubmitHandler<T>;
  submitLabel?: string;
  className?: string;
}

export function FormBuilder<
  T extends Record<string, string | FileList>
>({ fields, onSubmit, submitLabel = "Submit", className = "" }: FormBuilderProps<T>) {
  const { register, handleSubmit, formState: { errors } } = useForm<T>();
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviews(prev => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4 ${className}`}>
      {fields.map(field => (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              {...register(field.name as Path<T>, { required: field.required })}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          ) : field.type === "select" && field.options ? (
            <select
              {...register(field.name as Path<T>, { required: field.required })}
              defaultValue={field.defaultValue}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select...</option>
              {field.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : field.type === "file" ? (
            <>
              <input
                type="file"
                accept="image/*"
                {...register(field.name as Path<T>, { required: field.required })}
                onChange={(e) => handleFileChange(e, field.name)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {previews[field.name] && (
                <Image
                  src={previews[field.name]}
                  alt="Preview"
                  className="mt-2 max-h-40 rounded border"
                />
              )}
            </>
          ) : (
            <input
              type={field.type}
              {...register(field.name as Path<T>, { required: field.required })}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          )}

          {errors[field.name as Path<T>] && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>
      ))}
      
      <button
        type="submit"
        className="w-full bg-black text-white rounded px-4 py-2 font-medium mt-2"
      >
        {submitLabel}
      </button>
    </form>
  );
}
