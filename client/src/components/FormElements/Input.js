import cn from 'classnames'
import {findInputError}  from '../util/findInputError'
import  {isFormInvalid}   from '../util/isFormInvalid'


import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import { validate,VALIDATOR_LATIN, VALIDATOR_ALL_CAPITAL, VALIDATOR_DATE_BEFORE_TODAY } from '../util/validators'; // Εισαγωγή των κανόνων ελέγχου

export const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  validation,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputErrors = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputErrors)

  const input_tailwind =
    'p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60'

  return (
    <div className={cn('flex flex-col w-full gap-2', className)}>
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      <input
          id={id}
          type={type}
          className={cn(input_tailwind)}
          placeholder={placeholder}
          {...register(name, validation)}
          {...(type === 'text' && // Εφαρμογή κανόνων μόνο για τον τύπο 'text'
          register(name, {
            validate: (value) => {
              const isValid = validate(value, [VALIDATOR_LATIN(), VALIDATOR_ALL_CAPITAL()]);
              return isValid || 'Please use capital and Latin letters';
            }
          })
        )}
        {...(type === 'date' && // Εφαρμογή κανόνων μόνο για τον τύπο 'date'
          register(name, {
            validate: (value) => {
              const isValid = validate(value, [VALIDATOR_DATE_BEFORE_TODAY()]);
              return isValid || 'Please insert a valid date! No Date after Today';
            }
          })
        )}
      />
    </div>
  )
}

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}