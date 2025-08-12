export function cls(classes: (string | undefined | null)[]) {
  return classes.filter((it) => it != null).join(' ')
}
