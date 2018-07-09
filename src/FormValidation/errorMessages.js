export const isRequired = (fieldName) => `${fieldName} is required`;

export const mustMatch = (otherFieldName) => {
  return (fieldName) => `${fieldName} must match ${otherFieldName}`;
};

export const minLength = (length) => {
  return (fieldName) => `${fieldName} must be at least ${length} characters`;
};

export const maxLength = (length) => {
  return (fieldName) => `${fieldName} must be max ${length} characters`;
};


export const isEmail = (fieldName) => `${fieldName} requires an @ to be valid email`;
export const isString = (fieldName) => `${fieldName} requires text only`;
export const isNumber = (fieldName) => `${fieldName} requires numeric values only`;
export const isDecimal = (fieldName) => `${fieldName} requires numeric and 00000.00 only`;
export const isCellNumner = (fieldName) => `${fieldName} requires minimum and maximum 10 digits`;