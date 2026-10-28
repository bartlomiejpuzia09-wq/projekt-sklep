# Patch do projektu Angular — SklepIT

Zawartość tego folderu należy skopiować do istniejącego projektu, zachowując strukturę `src/app`. Pliki o tych samych ścieżkach zastępują aktualne wersje; pozostałe są nowe.

## Co zawiera patch

- Routing z lazy loading (`loadComponent`) dla strony głównej, strony produktu, koszyka, płatności, podsumowania zamówienia i strony 404.
- Naprawę zapętlenia trasy głównej: `AppComponent` jest szkieletem aplikacji, a trasa `''` ładuje stronę listy produktów.
- Wspólny `ShopService` z jednym stanem koszyka i danymi zamówienia.
- Ten sam `CartComponent` używany jako strona `/cart` i wysuwany modal z nagłówka.
- Przyciski `+` i `−`, usuwanie pozycji po zejściu do zera oraz aktualizację sumy.
- Stronę szczegółów produktu z prostą karuzelą pozostałych produktów.
- Reactive Forms, walidację adresu/e-maila/kodu BLIK lub numeru karty oraz warunkowe pola płatności.
- Symulowany błąd przy około 10% prób złożenia zamówienia. Przy błędzie koszyk nie jest czyszczony.
- Przekierowanie po udanym złożeniu zamówienia do `/order-summary`.

## Jak wgrać

1. Zrób kopię zapasową folderu `src/app`.
2. Skopiuj zawartość folderu `src/app` z tej paczki do `src/app` w swoim projekcie, zezwalając na zastąpienie plików o tych samych nazwach.
3. Upewnij się, że `src/app/app.config.ts` nadal używa `provideRouter(routes)` z `./app.routes` (zwykle nie trzeba go zmieniać).
4. W terminalu uruchom `npm install`, a następnie `ng serve`.
5. Sprawdź adresy `/`, `/product/keyboard`, `/cart`, `/payment` i `/order-summary`.

## Ważne uwagi

- Kod zakłada samodzielne komponenty Angular (`standalone`) i obsługę składni `@if`/`@for` (Angular 17+).
- Karuzela jest napisana bez dodatkowych zależności, żeby nie wprowadzać konfliktu wersji. W npm istnieją m.in. `ngx-owl-carousel-o` i `@ngu/carousel`, ale wersję biblioteki należy dobrać do wersji Angulara w `package.json`.
- To demonstracja szkolna — nie integruje prawdziwej bramki płatniczej ani nie wysyła danych na serwer. Nie wpisuj prawdziwych danych karty ani kodów BLIK.
- Nie mogłem uruchomić kompilacji w Twoim repozytorium, ponieważ w tym środowisku nie udało się pobrać plików GitHuba. Po wgraniu patcha najważniejszy test to `ng serve`; jeśli kompilator zgłosi błąd, prześlij pełny komunikat.
