export function cls(classes: (string | undefined | false | null)[]) {
  return classes.filter((it) => it != null && it != false).join(' ')
}
