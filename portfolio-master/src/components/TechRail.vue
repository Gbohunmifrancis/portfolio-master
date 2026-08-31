<template>
  <aside class="tech-rail" aria-label="Technology stack">
    <span class="tech-rail-label">stack / tools</span>
    <div class="tech-rail-window">
      <div class="tech-rail-track">
        <template v-for="copy in 2" :key="copy">
          <div v-for="item in stack" :key="`${copy}-${item.label}`" class="tech-icon" :title="item.label">
            <component :is="item.icon" aria-hidden="true" />
            <span>{{ item.short }}</span>
          </div>
        </template>
      </div>
    </div>
  </aside>
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
  { label: '.NET', short: '.NET', icon: DeDotNetOriginal },
  { label: 'C#', short: 'C#', icon: DeCsharpOriginal },
  { label: 'TypeScript', short: 'TS', icon: DeTypescriptOriginal },
  { label: 'Vue', short: 'Vue', icon: DeVuejsOriginal },
  { label: 'React', short: 'React', icon: DeReactOriginal },
  { label: 'Next.js', short: 'Next', icon: DeNextjsOriginal },
  { label: 'Python', short: 'Py', icon: DePythonOriginal },
  { label: 'PostgreSQL', short: 'SQL', icon: DePostgresqlOriginal },
  { label: 'SQL Server', short: 'MSSQL', icon: DeMicrosoftsqlserverPlain },
  { label: 'Redis', short: 'Redis', icon: DeRedisOriginal },
  { label: 'Docker', short: 'Docker', icon: DeDockerOriginal },
  { label: 'Azure', short: 'Azure', icon: DeAzureOriginal },
  { label: 'Firebase', short: 'FB', icon: DeFirebasePlain },
  { label: 'Git', short: 'Git', icon: DeGitOriginal },
  { label: 'GitHub', short: 'GH', icon: DeGithubOriginal },
  { label: 'VS Code', short: 'Code', icon: DeVscodeOriginal },
];
</script>
