import {KatakanaGame} from "./games/katakana";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="ga-2 flex flex-col items-center">
        <h1 className="text-3xl font-bold">Welcome to dummy-japanese</h1>
        <p className="mt-4">This is a dummy project generated by appncy.</p>
      </div>
      <KatakanaGame />
    </div>
  );
}
