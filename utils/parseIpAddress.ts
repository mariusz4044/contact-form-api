export default function (ipString: string): string {
  return ipString.replace("::ffff:", "");
}
