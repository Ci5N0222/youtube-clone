import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko'

// 한국어
register('ko', koLocale);

export function formatAgo(date, lang='en_US') {
    return format(date, lang);
}