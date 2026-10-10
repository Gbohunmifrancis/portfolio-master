<template>
  <div class="stack-strip" aria-label="Technology stack">
    <span class="stack-label">Tools I work with</span>
    <div class="stack-window">
      <div class="stack-track">
        <template v-for="copy in 2" :key="copy">
          <span v-for="item in stack" :key="`${copy}-${item.label}`" class="stack-chip" :aria-hidden="copy === 2">
            <component :is="item.icon" aria-hidden="true" />
            {{ item.label }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DeAzureOriginal,
  DeCsharpOriginal,
  DeDockerOriginal,
  DeDotNetOriginal,
  DeFirebasePlain,
  DeGitOriginal,
  DeGithubOriginal,
  DeMicrosoftsqlserverPlain,
  DeNextjsOriginal,
  DePostgresqlOriginal,
  DePythonOriginal,
  DeReactOriginal,
  DeRedisOriginal,
  DeTypescriptOriginal,
  DeVscodeOriginal,
  DeVuejsOriginal,
} from '@kalimahapps/vue-icons/de';

const stack = [
  { label: '.NET', icon: DeDotNetOriginal },
  { label: 'C#', icon: DeCsharpOriginal },
  { label: 'TypeScript', icon: DeTypescriptOriginal },
  { label: 'Vue', icon: DeVuejsOriginal },
  { label: 'React', icon: DeReactOriginal },
  { label: 'Next.js', icon: DeNextjsOriginal },
  { label: 'Python', icon: DePythonOriginal },
  { label: 'PostgreSQL', icon: DePostgresqlOriginal },
  { label: 'SQL Server', icon: DeMicrosoftsqlserverPlain },
  { label: 'Redis', icon: DeRedisOriginal },
  { label: 'Docker', icon: DeDockerOriginal },
  { label: 'Azure', icon: DeAzureOriginal },
  { label: 'Firebase', icon: DeFirebasePlain },
  { label: 'Git', icon: DeGitOriginal },
  { label: 'GitHub', icon: DeGithubOriginal },
  { label: 'VS Code', icon: DeVscodeOriginal },
];
</script>
