/** FIFA flag URLs use placeholders: flags-{format}-{size}/CODE */
export function resolveFlagUrl(template: string | undefined): string | undefined {
  if (!template) return undefined;
  return template.replace("{format}-{size}", "sq-4");
}
