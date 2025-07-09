const validationMessages = {
  login: {
    email: {
      blank: "이메일을 입력해주세요.",
      invalid: "유효한 이메일 주소를 입력해주세요.",
    },
    password: {
      blank: "비밀번호를 입력해주세요.",
      tooShort: "비밀번호는 8자 이상이어야 합니다.",
    },
    fail: "이메일 또는 비밀번호가 올바르지 않습니다.",
  },
  signup: {
    name: {
      blank: "이름을 입력해주세요.",
    },
    email: {
      blank: "이메일을 입력해주세요.",
      invalid: "유효한 이메일 주소를 입력해주세요.",
    },
    password: {
      blank: "비밀번호를 입력해주세요.",
      invalid:
        "비밀번호는 영어, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
    },
    confirmPassword: {
      blank: "비밀번호 확인을 입력해주세요.",
      mismatch: "비밀번호가 일치하지 않습니다.",
    },
  },
};

export default validationMessages;
