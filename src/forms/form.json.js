export const loginForm = [
  {
    key: 'username',
    label: 'User Name (email address)',
    type: 'email',
    fieldValidations: { required: true, emailFormat: true },
    options: {
      autoComplete: 'email',
      placeholder: 'Email address...',
      icon: 'fa fa fa-envelope-o'
    }
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password',
    fieldValidations: { required: true, minLength: 6 },
    options: {
      autoComplete: 'current-password',
      placeholder: 'Password..',
      icon: 'fa fa fa-lock'
    }
  }
];

export const signupForm = [
  {
    key: 'roles',
    label: 'Role',
    type: 'checkbox',
    fieldValidations: { required: true },
    opts: { inline: true },
    options: [
      {
        key: 'Administrator',
        label: 'Administrator',
        value: 'Administrator'
      },
      {
        key: 'Capturer',
        label: 'Capturer',
        value: 'Capturer'
      },
      {
        key: 'Manager',
        label: 'Manager',
        value: 'Manager'
      },
      {
        key: 'SuperUser',
        label: 'SuperUser',
        value: 'SuperUser'
      },
      {
        key: 'Resolver',
        label: 'Resolver',
        value: 'Resolver'
      },
      {
        key: 'QA',
        label: 'QA',
        value: 'QA'
      }
    ]
  },
  {
    key: 'name',
    label: 'First Name',
    type: 'text',
    fieldValidations: {
      required: true,
      isString: true,
      minLength: 5,
      maxLength: 30
    },
    options: {
      autoComplete: 'given-name',
      placeholder: 'First Name...',
      icon: 'fa fa fa-user'
    }
  },
  {
    key: 'email',
    label: 'User Name (email address)',
    type: 'email',
    fieldValidations: { required: true, emailFormat: true },
    options: {
      autoComplete: 'email',
      placeholder: 'Email address...',
      icon: 'fa fa fa-envelope-o'
    }
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password',
    fieldValidations: { required: true },
    options: {
      autoComplete: 'current-password',
      placeholder: 'Password..',
      icon: 'fa fa fa-lock'
    }
  },
  {
    key: 'cellNumber',
    label: 'Phone Mobile',
    type: 'text',
    fieldValidations: { required: true, isCellnumber: true },
    options: {
      autoComplete: 'tel',
      placeholder: 'Phone Mobile...',
      icon: 'fa fa fa-phone'
    }
  }
];
export const searchUsersForm = [
  {
    key: 'username',
    label: 'User Name ',
    type: 'text',
    fieldValidations: { required: false },
    options: {
      autoComplete: 'given-name',
      placeholder: 'User name...',
      icon: 'fa fa fa-user'
    }
  }
];

export const forgotPasswordForm = [
  {
    key: 'username',
    label: 'User Name (email address)',
    type: 'email',
    fieldValidations: { required: true, emailFormat: true },
    options: {
      autoComplete: 'email',
      placeholder: 'Email address...',
      icon: 'fa fa fa-envelope-o'
    }
  }
];

export const changePasswordForm = [
  {
    key: 'password',
    label: 'Current Password',
    type: 'password',
    fieldValidations: { required: true, minLength: 6 },
    options: {
      autoComplete: 'current-password',
      placeholder: 'Password..',
      icon: 'fa fa fa-lock'
    }
  },
  {
    key: 'newpassword',
    label: 'New Password',
    type: 'password',
    fieldValidations: { required: true, minLength: 6 },
    options: {
      autoComplete: 'current-password',
      placeholder: 'Password..',
      icon: 'fa fa fa-lock'
    }
  },
  {
    key: 'matchpassword',
    label: 'Match Password',
    type: 'password',
    fieldValidations: { required: true, minLength: 6 },
    options: {
      autoComplete: 'current-password',
      placeholder: 'Password..',
      icon: 'fa fa fa-lock'
    }
  }
];

export const multyRoleAssignForm = [
  {
    key: 'users',
    label: 'Users',
    type: 'select',
    header: 'User...',
    opts: { autoComplete: 'family-name' },
    options: [
      { key: 'user1', label: 'User1', value: 'User1' },
      { key: 'user2', label: 'User2', value: 'User2' },
      { key: 'user3', label: 'User3', value: 'User3' }
    ]
  },

  {
    key: 'role',
    label: 'Role',
    type: 'checkbox',
    fieldValidations: { required: true },
    opts: { inline: false },
    options: [
      { key: 'admin', label: 'Admin', value: 'Admin' },
      { key: 'capturer', label: 'Capturer', value: 'Capturer' },
      { key: 'superuser', label: ' Super User', value: ' Super User' },
      {
        key: 'Department Coordinator',
        label: 'Department Coordinator',
        value: '1'
      },
      {
        key: 'Capturer (Delegated User)',
        label: 'Capturer (Delegated User)',
        value: '2'
      },
      { key: 'DPME Coordinator', label: 'DPME Coordinator', value: '3' },
      {
        key: 'Treasury Coordinator',
        label: 'Treasury Coordinator',
        value: '4'
      },
      {
        key: 'System Administrator (Super User)',
        label: 'System Administrator (Super User)',
        value: '5'
      },
      { key: 'Head of Department', label: 'Head of Department', value: '6' },
      {
        key: 'Transferring Department Coordinator',
        label: 'Transferring Department Coordinator',
        value: '7'
      },
      { key: 'OTP Coordinator', label: 'OTP Coordinator', value: '8' },
      { key: 'National Oversight', label: 'National Oversight', value: '9' },
      { key: 'Entity Coordinator', label: 'Entity Coordinator', value: '10' },
      {
        key: 'National Coordinator',
        label: 'National Coordinator',
        value: '11'
      },
      { key: 'Public User', label: 'Public User', value: '12' }
    ]
  }
];

export const registrationForm = [
  // { key: 'score', label: 'Score', type: 'range', fieldValidations: { isSlider: true },
  //  options: {autoComplete: '',min:0,max:20,step:1,tooltip:'show',handle:'triangle'} }

  {
    key: 'createdAt',
    label: 'CreatedAt',
    type: 'SingleDatePicker',
    fieldValidations: { isSDP: true },
    options: {
      readOnly: true,
      numberOfMonths: 1,
      isOutsideRange: () => false,
      small: true,
      block: true,
      noBorder: true,
      displayFormat: 'MMM Do YYYY'
    }
  },
  {
    key: 'role',
    label: 'Role',
    type: 'select',
    header: 'Role...',
    opts: { autoComplete: 'family-name' },
    options: [
      { key: 'admin', label: 'Admin', value: 'Admin' },
      { key: 'capturer', label: 'Capturer', value: 'Capturer' },
      { key: 'superuser', label: ' Super User', value: ' Super User' }
    ]
  },
  {
    key: 'gender',
    label: 'Gender',
    type: 'radio',
    fieldValidations: { required: true },
    opts: { inline: false },
    options: [
      { key: 'male', label: 'Male', name: 'gender', value: 'male' },
      { key: 'female', label: 'Female', name: 'gender', value: 'female' }
    ]
  },

  {
    key: 'skills',
    label: 'Skills',
    type: 'checkbox',
    fieldValidations: { required: true },
    opts: { inline: true },
    options: [
      { key: 'reactjs', label: 'ReactJS', value: 'reactjs' },
      { key: 'angular', label: 'Angular', value: 'angular' },
      { key: 'vuejs', label: 'VueJS', value: 'vuejs' }
    ]
  },
  {
    key: 'firstName',
    label: 'First Name',
    type: 'text',
    fieldValidations: {
      required: true,
      isString: true,
      minLength: 5,
      maxLength: 30
    },
    options: {
      autoComplete: 'given-name',
      placeholder: 'First Name...',
      icon: 'fa fa fa-user'
    }
  },
  {
    key: 'lastName',
    label: 'Last Name',
    type: 'text',
    fieldValidations: {
      required: true,
      isString: true,
      minLength: 5,
      maxLength: 30
    },
    options: {
      autoComplete: 'family-name',
      placeholder: 'Last Name...',
      icon: 'fa fa fa-user'
    }
  },
  {
    key: 'username',
    label: 'User Name (email address)',
    type: 'email',
    fieldValidations: { required: true, emailFormat: true },
    options: {
      autoComplete: 'email',
      placeholder: 'Email address...',
      icon: 'fa fa fa-envelope-o'
    }
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password',
    fieldValidations: { required: true },
    options: {
      autoComplete: 'current-password',
      placeholder: 'Password..',
      icon: 'fa fa fa-lock'
    }
  },
  {
    key: 'salary',
    label: 'Salary($)',
    type: 'text',
    fieldValidations: { required: true, isCurrency: true },
    options: { autoComplete: '', placeholder: 'Salary..', icon: 'fa fa fa-usd' }
  },
  {
    key: 'phone',
    label: 'Phone Mobile',
    type: 'text',
    fieldValidations: { required: true, isCellnumber: true },
    options: {
      autoComplete: 'tel',
      placeholder: 'Phone Mobile...',
      icon: 'fa fa fa-phone'
    }
  },
  {
    key: 'age',
    label: 'Age',
    type: 'range',
    fieldValidations: { isSlider: true },
    options: {
      autoComplete: '',
      min: 0,
      max: 100,
      step: 1,
      tooltip: 'show',
      handle: 'round'
    }
  },
  {
    key: 'note',
    label: 'Note',
    type: 'textarea',
    autoComplete: '',
    fieldValidations: { required: true },
    options: { autoComplete: '', placeholder: 'Note...', icon: '' }
  }
];

export const formControls = [
  // date control :
  {
    key: 'createdAt',
    label: 'CreatedAt',
    type: 'SingleDatePicker',
    fieldValidations: { isSDP: true },
    options: {
      readOnly: true,
      numberOfMonths: 1,
      isOutsideRange: () => false,
      small: true,
      block: true,
      noBorder: true,
      displayFormat: 'MMM Do YYYY'
    }
  },
  {
    key: 'dateFilter',
    label: 'DateRangePicker',
    type: 'DateRangePicker',
    fieldValidations: { isDRP: true },
    options: {
      readOnly: true,
      numberOfMonths: 1,
      isOutsideRange: () => false,
      small: true,
      block: true,
      noBorder: true,
      displayFormat: 'MMM Do YYYY'
    }
  },

  // text box control:
  {
    key: 'firstName',
    label: 'First Name',
    type: 'text',
    fieldValidations: {
      required: true,
      isString: true,
      minLength: 5,
      maxLength: 30
    },
    options: {
      autoComplete: 'given-name',
      placeholder: 'First Name...',
      icon: 'fa fa fa-user'
    }
  },
  {
    key: 'lastName',
    label: 'Last Name',
    type: 'text',
    fieldValidations: {
      required: true,
      isString: true,
      minLength: 5,
      maxLength: 30
    },
    options: {
      autoComplete: 'family-name',
      placeholder: 'Last Name...',
      icon: 'fa fa fa-user'
    }
  },

  {
    key: 'username',
    label: 'User Name (email address)',
    type: 'email',
    fieldValidations: { required: true, emailFormat: true },
    options: {
      autoComplete: 'email',
      placeholder: 'Email address...',
      icon: 'fa fa fa-envelope-o'
    }
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password',
    fieldValidations: { required: true },
    options: {
      autoComplete: 'current-password',
      placeholder: 'Password..',
      icon: 'fa fa fa-lock'
    }
  },
  {
    key: 'salary',
    label: 'Salary($)',
    type: 'text',
    fieldValidations: { required: true, isCurrency: true },
    options: { autoComplete: '', placeholder: 'Salary..', icon: 'fa fa fa-usd' }
  },
  {
    key: 'phone',
    label: 'Phone Mobile',
    type: 'text',
    fieldValidations: { required: true, isCellnumber: true },
    options: {
      autoComplete: 'tel',
      placeholder: 'Phone Mobile...',
      icon: 'fa fa fa-phone'
    }
  },

  {
    key: 'age',
    label: 'Age',
    type: 'range',
    fieldValidations: { isSlider: true },
    options: {
      autoComplete: '',
      min: 0,
      max: 100,
      step: 1,
      tooltip: 'show',
      handle: 'round'
    }
  },
  {
    key: 'note',
    label: 'Note',
    type: 'textarea',
    autoComplete: '',
    fieldValidations: { required: true },
    options: { autoComplete: '', placeholder: 'Note...', icon: '' }
  },
  {
    key: 'rating',
    label: 'Rating',
    type: 'number',
    fieldValidations: {},
    options: { autoComplete: '' }
  },

  // select control :
  {
    key: 'role',
    label: 'Role',
    type: 'select',
    header: 'Role...',
    opts: { autoComplete: 'family-name' },
    options: [
      { key: 'admin', label: 'Admin', value: 'Admin' },
      { key: 'capturer', label: 'Capturer', value: 'Capturer' },
      { key: 'superuser', label: ' Super User', value: ' Super User' }
    ]
  },

  // radio control :
  {
    key: 'gender',
    label: 'Gender',
    type: 'radio',
    fieldValidations: { required: true },
    opts: { inline: false },
    options: [
      { key: 'male', label: 'Male', name: 'gender', value: 'male' },
      { key: 'female', label: 'Female', name: 'gender', value: 'female' }
    ]
  },

  // // check box control :
  {
    key: 'skills',
    label: 'Skills',
    type: 'checkbox',
    fieldValidations: { required: true },
    opts: { inline: true },
    options: [
      { key: 'reactjs', label: 'ReactJS', value: 'reactjs' },
      { key: 'angular', label: 'Angular', value: 'angular' },
      { key: 'vuejs', label: 'VueJS', value: 'vuejs' }
    ]
  }
];
