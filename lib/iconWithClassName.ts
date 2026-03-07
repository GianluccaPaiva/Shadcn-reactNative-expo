import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

export function iconWithClassName(icon: LucideIcon) {
    cssInterop(icon, {
        className: {
            target: 'style',
            nativeStyleToProp: {
                color: true,
                opacity: true,
            },
        },
    });
}

export function iconListWithClassName(iconList: LucideIcon[]) {
    for (const icon of iconList) {
        iconWithClassName(icon);
    }
}