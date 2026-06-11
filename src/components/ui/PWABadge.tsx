import { useRegisterSW } from 'virtual:pwa-register/react'
import { RefreshCw, X } from 'lucide-react'

export function PWABadge() {
  // check for updates every hour
  const period = 60 * 60 * 1000

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl: string, r: ServiceWorkerRegistration | undefined) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        setInterval(() => r.update(), period)
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e: Event) => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated') setInterval(() => r.update(), period)
        })
      }
    },
  })

  function close() {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (!offlineReady && !needRefresh) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-surface border border-border shadow-2xl rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-sm">
              {offlineReady ? 'Prêt pour le mode hors-ligne' : 'Mise à jour disponible'}
            </h3>
            <p className="text-muted text-xs mt-1">
              {offlineReady
                ? 'L\'application a été mise en cache et peut maintenant fonctionner sans connexion internet.'
                : 'Une nouvelle version de l\'application est disponible. Rechargez pour appliquer les changements.'}
            </p>
          </div>
          <button 
            onClick={close}
            className="text-muted hover:text-foreground p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          {needRefresh && (
            <button
              onClick={() => updateServiceWorker(true)}
              className="flex-1 bg-primary text-background py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              <RefreshCw className="w-4 h-4" />
              Recharger
            </button>
          )}
          <button
            onClick={close}
            className="flex-1 bg-surface-active text-foreground py-2 rounded-xl text-sm font-bold active:scale-[0.98] transition-transform"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
