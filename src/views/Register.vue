<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ "Register_title" | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >{{ "Login_warning" | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        ></small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password"> {{ "Login_password" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{ "Login_enter_password" | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          Пароль должен быть {{ $v.password.$params.minLength.min }} символов.
          Сейчас он {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">{{ "Profile_name" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          {{ "Profile_message_EnterName" | localize }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{ "Register_regulations_checkbox" | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ "Register_registration" | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ "Register_account_exists" | localize }}
        <router-link to="/login">
          {{ "Register_come_in" | localize }}</router-link
        >
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {}
    }
  }
};
</script>
