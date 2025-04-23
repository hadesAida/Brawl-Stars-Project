// utils.ts
export function safeJoin(base: string, ...parts: (string | number | null | undefined)[]): string {
    // Очищаем все пустые и незначащие параметры
    const clean = (p: string | number | null | undefined) =>
      p === null || p === undefined ? '' : String(p).replace(/^\/+|\/+$/g, '');  // Убираем лишние слэши с краев
  
    // Формируем URL без лишних слэшей
    const result = [base.replace(/\/+$/, '')] // Убираем слэш в конце base
      .concat(parts.filter(Boolean).map(clean)) // Фильтруем пустые и null
      .join('/'); // Собираем части в одну строку
  
    return result;
  }
  
  