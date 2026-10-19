import { Smartphone, Camera, MessageCircle, Music, FileSpreadsheet, FileCode2, Store } from "lucide-react";

export function LibraryAppStore() {
  return (
    <figure className="not-prose my-6">
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border border-espresso-900/10 bg-cream p-4 text-center">
          <Smartphone className="mx-auto h-6 w-6 text-espresso-700" strokeWidth={1.6} />
          <p className="mt-2 font-display text-sm font-semibold text-espresso-950">Your phone + apps</p>
          <div className="mt-2.5 flex justify-center gap-2 text-espresso-500">
            <Camera className="h-4 w-4" />
            <MessageCircle className="h-4 w-4" />
            <Music className="h-4 w-4" />
          </div>
          <p className="mt-2 text-[12px] text-espresso-700/75">Doesn't edit photos out of the box, so you install a photo app.</p>
        </div>

        <div className="flex flex-col items-center gap-1 px-1 text-center">
          <Store className="h-5 w-5 text-caramel-600" />
          <span className="text-[10.5px] font-bold tracking-wide text-caramel-700 uppercase">pip, the app store</span>
        </div>

        <div className="rounded-2xl border border-caramel-300/50 bg-caramel-100/30 p-4 text-center">
          <FileCode2 className="mx-auto h-6 w-6 text-caramel-700" strokeWidth={1.6} />
          <p className="mt-2 font-display text-sm font-semibold text-espresso-950">Python + libraries</p>
          <div className="mt-2.5 flex justify-center gap-2 text-caramel-600">
            <FileSpreadsheet className="h-4 w-4" />
          </div>
          <p className="mt-2 text-[12px] text-espresso-700/75">Can't read Excel out of the box, so you install pandas and openpyxl.</p>
        </div>
      </div>
    </figure>
  );
}
