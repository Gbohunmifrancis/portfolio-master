<template>
  <section id="toolbox" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="underline-title">What I Build With</h2>
        <p>The tools I reach for most to turn ideas into products people can actually use.</p>
      </div>
      <div class="toolbox">
        <article v-for="(group, index) in groups" :key="group.name" class="tool-card">
          <div>
            <span class="num">0{{ index + 1 }}</span>
            <h3>{{ group.name }}</h3>
          </div>
          <div class="tool-list">
            <span v-for="tool in group.tools" :key="tool.label" class="tool"><component :is="tool.icon" aria-hidden="true" />{{ tool.label }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  DeAzureOriginal,
  DeCsharpOriginal,
  DeDockerOriginal,
  DeDotNetOriginal,
  DeFastapiOriginal,
  DeGitOriginal,
  DeKotlinOriginal,
  DeMicrosoftsqlserverPlain,
  DeNextjsOriginal,
  DePostgresqlOriginal,
  DePythonOriginal,
  DeReactOriginal,
  DeRedisOriginal,
  DeThreejsOriginal,
  DeTypescriptOriginal,
  DeVuejsOriginal,
} from '@kalimahapps/vue-icons/de';

const groups = [
  { name: 'Backend', tools: [
    { label: '.NET', icon: DeDotNetOriginal },
    { label: 'C#', icon: DeCsharpOriginal },
    { label: 'PostgreSQL', icon: DePostgresqlOriginal },
    { label: 'SQL Server', icon: DeMicrosoftsqlserverPlain },
    { label: 'Redis', icon: DeRedisOriginal },
  ] },
  { name: 'Web & Mobile', tools: [
    { label: 'TypeScript', icon: DeTypescriptOriginal },
    { label: 'React · Next.js', icon: DeNextjsOriginal },
    { label: 'Vue', icon: DeVuejsOriginal },
    { label: 'React Native', icon: DeReactOriginal },
    { label: 'Kotlin · Android', icon: DeKotlinOriginal },
    { label: 'three.js', icon: DeThreejsOriginal },
  ] },
  { name: 'Data & Ops', tools: [
    { label: 'Python', icon: DePythonOriginal },
    { label: 'FastAPI', icon: DeFastapiOriginal },
    { label: 'Docker', icon: DeDockerOriginal },
    { label: 'Azure', icon: DeAzureOriginal },
    { label: 'Git', icon: DeGitOriginal },
  ] },
];
</script>
