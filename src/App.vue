<script setup lang="ts">
  import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
  import { useTheme } from 'vuetify';

  const theme = useTheme();

  const invertTheme = () => {
    const newTheme = theme.global.current.value.dark ? 'light' : 'dark';

    theme.global.name.value = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const showHelp = () => {
    // TODO
  };

  onBeforeMount(() => {
    const storedTheme = localStorage.getItem('theme');
    if(storedTheme === 'light' || storedTheme === 'dark') {
      theme.global.name.value = storedTheme;
    }
  })
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <h3>Fibricare</h3>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn
          @click="showHelp"
          cols="auto"
          hint="О приложении"
          icon="mdi-help"
        />
        <v-btn
          @click="invertTheme"
          cols="auto"
          hint="Сменить тему"
          icon="mdi-theme-light-dark"
        />
      </template>
    </v-app-bar>
    
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
