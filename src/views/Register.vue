<template>
  <form class='card auth-card' @submit.prevent='submitHandler'>
    <div class='card-content'>
      <span class='card-title'>Домашняя бухгалтерия</span>
      <div class='input-field'>
        <input id='email' type='text' v-model='email' />
        <label for='email'>Email</label>
        <small class='helper-text invalid'>Email</small>
      </div>
      <div class='input-field'>
        <input
          id='password'
          type='password'
          class='validate'
          v-model='password'
        />
        <label for='password'>Пароль</label>
        <small class='helper-text invalid'>Password</small>
      </div>
      <div class='input-field'>
        <input id='name' type='text' class='validate' v-model='name' />
        <label for='name'>Имя</label>
        <small class='helper-text invalid'>Name</small>
      </div>
      <p>
        <label>
          <input type='checkbox' />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class='card-action'>
      <div>
        <button class='btn waves-effect waves-light auth-submit' type='submit'>
          Зарегистрироваться
          <i class='material-icons right'>send</i>
        </button>
      </div>

      <p class='center'>
        Уже есть аккаунт?
        <a href='/'>Войти!</a>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    name: '',
  }),
  methods: {
    async submitHandler() {
      // где валидация? Подтянуть сюда
      // if (this.$v.$invalid) {
      //   this.$v.$touch()
      //   return
      // }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {}
    },
  },
}
</script>