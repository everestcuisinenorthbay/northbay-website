'use client';

import { useState, FormEvent, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon, UserIcon, EnvelopeIcon, PhoneIcon, CalendarIcon, ClockIcon, UserGroupIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
  notes: string;
  occasion: string;
}

interface FieldOption {
  value: string;
  label: string;
}

interface BaseField {
  id: string;
  label: string;
  type: string;
  icon: React.ReactNode;
  required: boolean;
  colSpan: string;
}

interface TextField extends BaseField {
  type: 'text' | 'email' | 'tel';
  placeholder?: string;
}

interface DateField extends BaseField {
  type: 'date';
  min?: string;
}

interface SelectField extends BaseField {
  type: 'select';
  options: FieldOption[];
}

type FormField = TextField | DateField | SelectField;

interface FormSection {
  title: string;
  fields: FormField[];
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: '2',
    notes: '',
    occasion: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/book-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          partySize: parseInt(formData.partySize),
          occasion: formData.occasion || undefined,
          notes: formData.notes || undefined
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Your reservation has been submitted successfully. We will confirm your booking shortly.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          partySize: '2',
          notes: '',
          occasion: '',
        });
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error: any) {
      setSubmitResult({
        success: false,
        message: 'Something went wrong. Please try again or call us directly. Error: ' + error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate all possible time options
  const allTimeOptions = useMemo(() => {
    const options = [
      ...[...Array(6)].map((_, index) => {
        const hour = 11 + Math.floor(index / 2);
        const mins = index % 2 === 0 ? '30' : '00';
        const time = `${hour}:${mins}`;
        const ampm = hour < 12 ? 'AM' : 'PM';
        const hour12 = hour > 12 ? hour - 12 : hour;
        return { value: time, label: `${hour12}:${mins} ${ampm}` };
      }),
      ...[...Array(8)].map((_, index) => {
        const hour = 17 + Math.floor(index / 2);
        const mins = index % 2 === 0 ? '30' : '00';
        const time = `${hour}:${mins}`;
        const ampm = 'PM';
        const hour12 = hour > 12 ? hour - 12 : hour;
        return { value: time, label: `${hour12}:${mins} ${ampm}` };
      })
    ];
    // Sort by time value (HH:MM)
    options.sort((a, b) => {
      const [ah, am] = a.value.split(':').map(Number);
      const [bh, bm] = b.value.split(':').map(Number);
      return (ah * 60 + am) - (bh * 60 + bm);
    });
    return [{ value: '', label: 'Select a time' }, ...options];
  }, []);

  // Filter time options based on selected date
  const filteredTimeOptions = useMemo(() => {
    if (!formData.date) return allTimeOptions;

    const now = new Date();
    // Parse formData.date (YYYY-MM-DD) as a local date
    const [year, month, day] = formData.date.split('-').map(Number);
    const selectedDateObject = new Date(year, month - 1, day);

    if (
      now.getFullYear() === selectedDateObject.getFullYear() &&
      now.getMonth() === selectedDateObject.getMonth() &&
      now.getDate() === selectedDateObject.getDate()
    ) {
      // Only show times that are in the future
      return allTimeOptions.filter(option => {
        if (!option.value) return true; // Keep "Select a time"
        const [h, m] = option.value.split(':').map(Number);
        const optionTime = new Date(year, month - 1, day, h, m);
        return optionTime > now;
      });
    }
    return allTimeOptions;
  }, [formData.date, allTimeOptions]);

  const formSections: FormSection[] = [
    {
      title: "Contact Information",
      fields: [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
          icon: <UserIcon className="w-5 h-5 text-everest-green/70" />,
      required: true,
          colSpan: 'md:col-span-2',
          placeholder: "John Doe",
        } as TextField,
    {
      id: 'email',
          label: 'Email Address',
      type: 'email',
          icon: <EnvelopeIcon className="w-5 h-5 text-everest-green/70" />,
      required: true,
      colSpan: 'md:col-span-1',
          placeholder: "john.doe@example.com",
        } as TextField,
    {
      id: 'phone',
          label: 'Phone Number',
      type: 'tel',
          icon: <PhoneIcon className="w-5 h-5 text-everest-green/70" />,
      required: true,
      colSpan: 'md:col-span-1',
          placeholder: "(123) 456-7890",
        } as TextField,
      ]
    },
    {
      title: "Reservation Details",
      fields: [
    {
      id: 'date',
          label: 'Preferred Date',
      type: 'date',
          icon: <CalendarIcon className="w-5 h-5 text-everest-green/70" />,
      required: true,
      colSpan: 'md:col-span-1',
      min: new Date().toISOString().split('T')[0],
        } as DateField,
    {
      id: 'time',
          label: 'Preferred Time',
      type: 'select',
          icon: <ClockIcon className="w-5 h-5 text-everest-green/70" />,
      options: filteredTimeOptions,
      required: true,
      colSpan: 'md:col-span-1',
        } as SelectField,
        {
          id: 'partySize',
          label: 'Number of Guests',
          type: 'select',
          icon: <UserGroupIcon className="w-5 h-5 text-everest-green/70" />,
          options: [1, 2, 3, 4, 5, 6, 7, 8].map((num) => ({
            value: num.toString(),
            label: `${num} ${num === 1 ? 'person' : 'people'}`,
          })),
          required: true,
          colSpan: 'md:col-span-1',
        } as SelectField,
        {
          id: 'occasion',
          label: 'Special Occasion',
          type: 'select',
          icon: <CalendarIcon className="w-5 h-5 text-everest-green/70" />,
          options: [
            { value: '', label: 'Select if applicable' },
            { value: 'birthday', label: 'Birthday' },
            { value: 'anniversary', label: 'Anniversary' },
            { value: 'business', label: 'Business Meal' },
            { value: 'date', label: 'Date Night' },
            { value: 'other', label: 'Other' },
          ],
          required: false,
          colSpan: 'md:col-span-1',
        } as SelectField,
      ]
    }
  ];

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {submitResult && (
        <motion.div
          className={`p-5 mb-6 rounded-md flex items-start gap-3 ${
            submitResult.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {submitResult.success ? (
            <CheckCircleIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
          ) : (
            <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
          )}
          <p className="font-sans text-sm">{submitResult.message}</p>
        </motion.div>
      )}

      {formSections.map((section, sectionIndex) => (
        <div key={section.title} className="space-y-5">
          <h3 className="text-lg font-serif text-gray-800 border-b border-gray-200 pb-2">{section.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {section.fields.map((field, fieldIndex) => (
          <motion.div 
            key={field.id} 
            className={field.colSpan}
                initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (sectionIndex * 0.2) + (fieldIndex * 0.1) }}
          >
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1 font-sans">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors">
                {field.icon}
              </div>
              
              {field.type === 'select' && field.id === 'time' ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={(formData as any)[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-everest-green/50 focus:border-everest-green bg-white shadow-sm font-sans text-gray-700 appearance-none transition-colors group-hover:border-everest-green"
                >
                  {filteredTimeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'select' ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={(formData as any)[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-everest-green/50 focus:border-everest-green bg-white shadow-sm font-sans text-gray-700 appearance-none transition-colors group-hover:border-everest-green"
                >
                  {(field as SelectField).options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={(formData as any)[field.id]}
                  onChange={handleChange}
                  required={field.required}
                      min={field.type === 'date' ? (field as DateField).min : undefined}
                      placeholder={field.type !== 'date' ? (field as TextField).placeholder : undefined}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-everest-green/50 focus:border-everest-green bg-white shadow-sm font-sans text-gray-700 transition-colors group-hover:border-everest-green"
                    />
                  )}
                  
                  {field.type === 'select' && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
        </div>
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="space-y-5"
      >
        <h3 className="text-lg font-serif text-gray-800 border-b border-gray-200 pb-2">Additional Information</h3>
        
        <div className="relative group">
          <div className="absolute top-3 left-3 flex items-center pointer-events-none">
            <PencilSquareIcon className="w-5 h-5 text-everest-green/70" />
          </div>
          
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Please let us know of any special requests or dietary requirements..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-everest-green/50 focus:border-everest-green bg-white shadow-sm font-sans text-gray-700 transition-colors group-hover:border-everest-green"
          ></textarea>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="pt-4"
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-8 py-4 bg-everest-green text-white font-semibold rounded-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-everest-green/50 focus:ring-offset-2 transition-colors duration-300 font-sans flex justify-center items-center ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Confirm Reservation'
          )}
        </button>
        
        <p className="mt-4 text-xs text-center text-gray-500 font-sans">
          By making a reservation, you agree to our booking policy. We'll send a confirmation email once your reservation is confirmed.
        </p>
      </motion.div>
    </motion.form>
  );
} 