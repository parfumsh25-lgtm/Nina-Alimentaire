/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  Plus, 
  Minus, 
  ShoppingCart, 
  Home as HomeIcon, 
  Grid, 
  User, 
  ShieldCheck, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  Package, 
  Truck, 
  Trash2, 
  TrendingUp,
  LayoutDashboard,
  Settings,
  Headphones,
  Smartphone,
  Shirt,
  Home as HouseIcon,
  Stethoscope,
  Gamepad2,
  MoreHorizontal,
  Send,
  Eye,
  Coins
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---

type Screen = 'home' | 'detail' | 'cart' | 'admin' | 'categories' | 'brand';

interface Subcategory {
  name: string;
  image: string;
}

interface Category {
  name: string;
  image: string;
  subcategories?: Subcategory[];
}

interface AppSettings {
  logo: string;
  whatsappNumber: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface PromoSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  targetCategory?: string;
}

interface MiddleBanner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  targetCategory?: string;
}

interface MiddleBanner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  targetCategory?: string;
}

interface BrandLogo {
  id: number;
  name: string;
  logo: string;
}

type CurrencyMode = 'MAD' | 'RIAL';

const formatPrice = (price: number, mode: CurrencyMode) => {
  if (mode === 'RIAL') {
    return `${(price * 20).toLocaleString()} ريال`;
  }
  return `${price.toFixed(2)} د.م.`;
};

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  moq: number;
  image: string;
  category: string;
  subcategory?: string;
  sku: string;
  rating: number;
  reviews: number;
  isHotSale?: boolean;
  isFeatured?: boolean;
  isAvailable?: boolean;
  brandId?: number;
}

// --- Mock Data ---

const BRANDS: BrandLogo[] = [
  { id: 1, name: 'نايكي', logo: 'https://logo.clearbit.com/nike.com' },
  { id: 2, name: 'أديداس', logo: 'https://logo.clearbit.com/adidas.com' },
  { id: 3, name: 'أبل', logo: 'https://logo.clearbit.com/apple.com' },
  { id: 4, name: 'سامسونج', logo: 'https://logo.clearbit.com/samsung.com' },
  { id: 5, name: 'سوني', logo: 'https://logo.clearbit.com/sony.com' },
  { id: 6, name: 'إل جي', logo: 'https://logo.clearbit.com/lg.com' },
];

const PROMO_SLIDES: PromoSlide[] = [
  {
    id: 1,
    title: 'أفضل صفقات الجملة لهذا العام',
    subtitle: 'خصم يصل إلى 70%',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200',
    cta: 'تسوق الآن',
    targetCategory: 'إلكترونيات'
  },
  {
    id: 2,
    title: 'وصل حديثاً: أزياء الصيف',
    subtitle: 'مجموعات حصرية للموزعين',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&q=80&w=1200',
    cta: 'اكتشف المزيد',
    targetCategory: 'ملابس'
  },
  {
    id: 3,
    title: 'تجهيزات المنزل الذكي',
    subtitle: 'أسعار تنافسية للكميات الكبيرة',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200',
    cta: 'احجز طلبك',
    targetCategory: 'إلكترونيات'
  }
];

const MIDDLE_BANNERS: MiddleBanner[] = [
  {
    id: 1,
    title: 'أزياء رجالية',
    subtitle: 'خصم 30% على الطلبات بالجملة',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800',
    cta: 'تسوق الآن',
    targetCategory: 'ملابس'
  },
  {
    id: 2,
    title: 'أثاث مكتبي',
    subtitle: 'تجهيزات كاملة للشركات',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
    cta: 'اكتشف المزيد',
    targetCategory: 'المنزل'
  }
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'سماعات لاسلكية فاخرة - إصدار برو',
    price: 24.50,
    originalPrice: 89.00,
    moq: 5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    category: 'إلكترونيات',
    subcategory: 'سماعات',
    sku: 'TECH-4429',
    rating: 4.8,
    reviews: 120,
    isHotSale: true,
    isFeatured: true,
    isAvailable: true
  },
  {
    id: '2',
    name: 'حذاء رياضي نيو سبرينت للمحترفين',
    price: 18.20,
    originalPrice: 55.00,
    moq: 12,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    category: 'ملابس',
    subcategory: 'أحذية',
    sku: 'SHOE-9921',
    rating: 4.9,
    reviews: 84,
    isHotSale: true,
    isFeatured: true,
    isAvailable: true
  },
  {
    id: '3',
    name: 'ساعة كوارتز تراثية فاخرة',
    price: 12.90,
    originalPrice: 45.00,
    moq: 20,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    category: 'إلكترونيات',
    subcategory: 'ساعات ذكية',
    sku: 'WATCH-401',
    rating: 4.5,
    reviews: 210,
    isHotSale: true,
    isFeatured: true,
    isAvailable: true
  },
  {
    id: '4',
    name: 'كاميرا فورية تناظرية ريترو',
    price: 32.00,
    originalPrice: 99.00,
    moq: 8,
    image: 'https://images.unsplash.com/photo-1526170315870-ef68a6f3dd39?auto=format&fit=crop&q=80&w=600',
    category: 'إلكترونيات',
    subcategory: 'كاميرات',
    sku: 'CAM-112',
    rating: 5.0,
    reviews: 42,
    isFeatured: true,
    isAvailable: true
  },
  {
    id: '5',
    name: 'حقيبة ظهر جلدية للأعمال',
    price: 45.00,
    originalPrice: 120.00,
    moq: 10,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600',
    category: 'ملابس',
    subcategory: 'رجالي',
    sku: 'BAG-772',
    rating: 4.7,
    reviews: 65,
    isFeatured: true,
    isAvailable: true
  },
  {
    id: '6',
    name: 'مصباح مكتب ذكي LED',
    price: 15.50,
    originalPrice: 35.00,
    moq: 15,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=600',
    category: 'المنزل',
    subcategory: 'إضاءة',
    sku: 'HOME-102',
    rating: 4.6,
    reviews: 89,
    isFeatured: true,
    isAvailable: false
  }
];

const CATEGORIES: Category[] = [
  { 
    name: 'البقالة', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200', 
    subcategories: [
      { name: 'الشاي الصحراوي', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgenQvrXks8YvaoNxvpTbhnZhP0TYNHvg2CIhLDaUXsUs9pFdVLTQlNQlNubKwUkDro_bULzUNzrNizo05AgCMLkRoSiVtsMExFVMOxr9BPkjLu4adqV0w53-g_RCs_9o7F_W2hbM8O8tPobMdAAMRBLHZeSQevnjGOVTAFK6AB7GzXAHBCzMVAu-2SiGQ/w400-h201/Eddahani-Cat19.png' },
      { name: 'معلبات السمك والخضر', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQwYsc1_NJ31k-yQG6-S6qQFKuIOrCjdTBEwhL-HH22k4speWhiK7Gd6tG682R7AHFuyI6rMDlW7MEM_C8Tb0j0AIFdiJ1GHF21jM8IAaz_p51biw2ddU1XE-P8Q4RXg9vrSoVpltky1qZkwf-ljln0XNifTBTJvdSZg_dBxiMWeYW8qKKcdKxjwmn1Xk/w400-h201/Eddahani-Cat19-Recovered.png' },
      { name: 'الدقيق والخميرة', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsE9rei2PS8ud5jAHVjg9yyh7hLOZ-7oHNQC6F3VvDSqv7caFnrA6RLP_qM6svCPrhHn9Kv-Ctfnu5X3q2TqP_eIUvnk9-ht84JvgZq_joW9f1O3bTEshwxUTwydgrf5QPbj9SFS_W2xGuSQOFpfcrknlb4rPGZSMTQe3tinQLh0kbec1Gt9Zujoi8Df8/w400-h201/Eddahani-Cat19-Recovered.png' },
      { name: 'الزيت والخل', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgkBvMi7AnN_xm6rZTT8eBYs0KGdtMM4JJi-Ly6ZPpt9-8Qshrcfg0KQ2q62WTptt_hYHhWmGk5yGHtiJGLB-6Pb-USUNAaAxp5aQ-SCBAG1T3yWtE3z64S9hrfS6ByTSJHj2q3WiqGMrYzaEYgWUrT-Gv6iFndQMnBcYVOUHpp09EGJX9FHW5ScDmLb_I/w400-h201/Eddahani-Cat19-Recovered.png' },
      { name: 'الارز والاطعمة النشوية', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFoLjcaf5JQW369KcX4YXbgT_GOGYgQh1IwDuarnUWJYxr-VgSqXOft-ZT3fNMiZpeiLrmVs6sPfOov2ON7iQ1xdrkN9GBw0DFYdf8uuKlGbw6n3KY8RBt7_VqY6U6iyaScWtZpkJ1lgblNtDhvtkUXnpOdVkyCTLlzeNAC5ObbUuhbL5PE3P6mOtqqsw/w400-h201/Eddahani-Cat19.png' },
      { name: 'الكسكس والسميـــد', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhxeryJiv5l5oULypFqOO0WIc0sXmN2KIF9PrcRIbFTVErVMaDtCcKSIfrg32JSh_-wmkJkAbOQqwCsfkJdGWzdYfdYNaEqoUoHxekDttmSQlUwQcxvXdJ4cxAul9fbbppA2EKPcMzDMqmmDR1Ys5yfqp5jvRo4XWiz9uqfBMnTOcT-TMFX9LlZAkHrHTI/w400-h201/Eddahani-Cat19-Recovered.png' },
      { name: 'العسل والمربى', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYr2HzVdNZZ6NLeZRmcZWFxHqNIuEUBhNNiPg_EUxopJMl5ZznTIopmnpAZDA0U_yXQqzI5i2xfrZvlgfAoEdjMMBg7ECVrDkhPt9L-fQ-TCv_400ieN4a8Ul2WKUpPHGvOQNvIHmMi8KPA-UtnzlMDC9oJcbRkZg9SHAOTmdrS-bOJdhcVWtibEuWKvU/w400-h201/Eddahani-Cat19-Recovered.png' },
      { name: 'السكر والقهوة', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhspDtKwf9bEKQRjVgPD7mX30A6gzDBqcTMpHJkEii-JVJTnLMSvYyt3rUjGMuuCQbtlhg-rxGjmQLzQ6O7tQDB1UfOaa3A1J9Z4FLMzA_ivXPuzATDrlp6xMGgTmnQOZi8HxgY-YsBVCuKKdgy3eUOKSuMVhbddXguWu_7cVRXbjV6bDxuNLGBn7c33xI/w400-h201/Eddahani-Cat19-Recovered.png' },
      { name: 'الملح والبهارات', image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=200' }
    ] 
  },
  {
    name: 'العصائر والاجبان',
    image: 'https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&q=80&w=200',
    subcategories: [
      { name: 'فرمـــــــاج', image: 'https://images.unsplash.com/photo-1486297678162-ad249fa5773c?auto=format&fit=crop&q=80&w=200' },
      { name: 'العصائر', image: 'https://images.unsplash.com/photo-1563636619-e91000f88fca?auto=format&fit=crop&q=80&w=200' },
      { name: 'زبدة والسمن', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    name: 'الحلويات والبسكويت',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&q=80&w=200',
    subcategories: [
      { name: 'البسكويت', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=200' },
      { name: 'حلويات', image: 'https://images.unsplash.com/photo-1582043242073-20ef14475885?auto=format&fit=crop&q=80&w=200' },
      { name: 'شكولاطة', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=200' },
      { name: 'شيبس', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    name: 'عالم الاطفال',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=200',
    subcategories: [
      { name: 'حفاظات', image: 'https://images.unsplash.com/photo-1617331140180-e8262094733a?auto=format&fit=crop&q=80&w=200' },
      { name: 'العناية بالطفل', image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    name: 'العناية والجمال',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200',
    subcategories: [
      { name: 'شامبو', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=200' },
      { name: 'صابون وجيل دوش', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=200' },
      { name: 'مناديل وورق الحمام', image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=200' },
      { name: 'العناية بالاسنان', image: 'https://images.unsplash.com/photo-1559591937-e68fb3335fd3?auto=format&fit=crop&q=80&w=200' },
      { name: 'عطور الصحراء', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=200' },
      { name: 'عناية عامة', image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    name: 'مواد التنظيف',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200',
    subcategories: [
      { name: 'مستلزمات التنظيف', image: 'https://images.unsplash.com/photo-1528740561666-dc2479da08ad?auto=format&fit=crop&q=80&w=200' },
      { name: 'مستلزمات الغسيل', image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=200' },
      { name: 'مبيدات', image: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    name: 'منتجات نينا بزار',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200',
    subcategories: [
      { name: 'اكسسوارت المطبخ', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200' },
      { name: 'البخور', image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=200' },
      { name: 'معطرات الجو', image: 'https://images.unsplash.com/photo-1602833280958-1657662ccc58?auto=format&fit=crop&q=80&w=200' }
    ]
  },
];

const INITIAL_SETTINGS: AppSettings = {
  logo: 'شوبيرز',
  whatsappNumber: '+1 (555) 012-3456'
};

// --- Components ---

const TopAppBar = ({ 
  title, 
  onBack, 
  showSearch = true, 
  onMenuClick, 
  logo, 
  cartCount, 
  onCartClick,
  currencyMode,
  onToggleCurrency
}: { 
  title?: string, 
  onBack?: () => void, 
  showSearch?: boolean, 
  onMenuClick?: () => void, 
  logo: string, 
  cartCount: number, 
  onCartClick: () => void,
  currencyMode: CurrencyMode,
  onToggleCurrency: () => void
}) => (
  <div className="fixed top-0 w-full z-50">
    {/* Location Bar */}
    {!onBack && (
      <div className="bg-primary text-white px-6 py-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <HouseIcon size={12} />
          <span>التوصيل إلى: <span className="opacity-80">الرياض، المملكة العربية السعودية</span></span>
        </div>
        <ChevronRight size={12} />
      </div>
    )}
    <header className="glass-header shadow-sm flex items-center justify-between px-6 h-16">
      <div className="flex items-center gap-4">
        {onBack ? (
          <button onClick={onBack} className="active:scale-95 duration-200 text-on-surface">
            <ArrowLeft size={24} />
          </button>
        ) : (
          <button onClick={onMenuClick} className="active:scale-95 duration-200 text-on-surface">
            <Menu size={24} />
          </button>
        )}
        <h1 className="text-xl font-black text-primary uppercase tracking-widest font-headline">
          {title || (logo.startsWith('http') ? <img src={logo} alt="Logo" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" /> : logo)}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="hidden md:flex items-center bg-surface-container rounded-full px-4 py-2 w-64">
            <Search size={18} className="text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="ابحث عن المنتجات..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full"
            />
          </div>
        )}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleCurrency}
            className="flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-primary hover:bg-primary/5 transition-colors"
          >
            <Coins size={14} />
            {currencyMode === 'MAD' ? 'الدرهم' : 'الريال'}
          </button>
          {showSearch && (
            <button className="md:hidden active:scale-95 duration-200 text-on-surface">
              <Search size={24} />
            </button>
          )}
          <button onClick={onCartClick} className="relative active:scale-95 duration-200 text-on-surface">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          <button className="relative active:scale-95 duration-200 text-on-surface">
            <User size={24} />
          </button>
        </div>
      </div>
    </header>
  </div>
);

const BottomNavBar = ({ activeScreen, setScreen, cartCount }: { activeScreen: Screen, setScreen: (s: Screen) => void, cartCount: number }) => (
  <nav className="fixed bottom-0 w-full z-50 rounded-t-[3rem] bg-white/90 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex justify-around items-center px-4 pt-3 pb-8">
    {[
      { id: 'home', label: 'الرئيسية', icon: HomeIcon },
      { id: 'categories', label: 'الفئات', icon: Grid },
      { id: 'cart', label: 'السلة', icon: ShoppingCart },
      { id: 'admin', label: 'المسؤول', icon: ShieldCheck },
    ].map((item) => {
      const isActive = activeScreen === item.id;
      return (
        <button
          key={item.id}
          onClick={() => setScreen(item.id as Screen)}
          className={cn(
            "flex flex-col items-center justify-center transition-all duration-300 px-4 py-1 rounded-full relative",
            isActive ? "text-primary bg-primary/10 scale-105" : "text-slate-400 hover:text-primary"
          )}
        >
          <div className="relative">
            <item.icon size={22} fill={isActive ? "currentColor" : "none"} />
            {item.id === 'cart' && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </div>
          <span className="font-body text-[10px] font-semibold uppercase tracking-wider mt-1">{item.label}</span>
        </button>
      );
    })}
  </nav>
);

// --- Screens ---

const HomeScreen = ({ 
  onProductClick, 
  onAddToCart, 
  onCategoryClick, 
  onBannerClick, 
  products, 
  categories, 
  promoSlides,
  middleBanners,
  brandLogos,
  currencyMode,
  onBrandClick
}: { 
  onProductClick: (p: Product) => void, 
  onAddToCart: (id: string, q: number) => void, 
  onCategoryClick: (catName: string) => void, 
  onBannerClick: (catName: string) => void, 
  products: Product[], 
  categories: Category[], 
  promoSlides: PromoSlide[],
  middleBanners: MiddleBanner[],
  brandLogos: BrandLogo[],
  currencyMode: CurrencyMode,
  onBrandClick: (brandId: number) => void,
  key?: React.Key
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promoSlides.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10"
    >
      {/* Search Bar Mobile */}
      <section className="md:hidden">
        <div className="flex items-center bg-surface-container rounded-2xl px-4 py-3 shadow-sm border border-surface-container-high">
          <Search size={20} className="text-on-surface-variant ml-2" />
          <input 
            type="text" 
            placeholder="ابحث عن المنتجات، الفئات..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full text-right"
          />
        </div>
      </section>

      {/* Hero Slider */}
      <section 
        className="relative h-64 md:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer"
        onClick={() => {
          const target = promoSlides[activeSlide]?.targetCategory;
          if (target) onBannerClick(target);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent z-10" />
            <img 
              className="absolute inset-0 w-full h-full object-cover" 
              src={promoSlides[activeSlide]?.image} 
              alt={promoSlides[activeSlide]?.title}
              referrerPolicy="no-referrer"
            />
            <div className="relative z-20 h-full flex flex-col justify-center items-start px-10 md:px-20 text-white text-right">
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-lg"
              >
                {promoSlides[activeSlide]?.subtitle}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-7xl font-black font-headline leading-tight mb-6 drop-shadow-2xl"
              >
                {promoSlides[activeSlide]?.title.split(':').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i === 0 && promoSlides[activeSlide]?.title.includes(':') && <br/>}
                  </React.Fragment>
                ))}
              </motion.h2>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white text-primary-dark px-10 py-4 rounded-full font-bold text-sm md:text-base uppercase tracking-widest hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                {promoSlides[activeSlide]?.cta}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Slider Controls */}
        <div className="absolute bottom-8 right-10 md:right-20 z-20 flex gap-3">
          {promoSlides.map((_, i) => (
            <button 
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(i);
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                activeSlide === i ? "w-12 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section id="special-offers" className="bg-red-50 rounded-[2.5rem] p-8 border border-red-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 text-white p-3 rounded-2xl shadow-lg shadow-red-200">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black font-headline tracking-tight text-red-900">عروض ساخنة</h3>
              <p className="text-xs font-bold text-red-600 uppercase tracking-widest">أفضل الأسعار حالياً</p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors self-start md:self-auto">
            عرض الكل
          </button>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
          {products.filter(p => p.isHotSale).map((product) => (
            <div 
              key={product.id}
              className="min-w-[220px] bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-4">
                <img 
                  className={cn(
                    "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
                    product.isAvailable === false && "grayscale opacity-50"
                  )}
                  src={product.image} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                  خصم كبير
                </div>
                {product.isAvailable === false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full">غير متوفر حالياً</span>
                  </div>
                )}
              </div>
              <h4 className="font-bold text-sm text-on-surface truncate mb-2">{product.name}</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-600 font-black text-lg">{formatPrice(product.price, currencyMode)}</span>
                <span className="text-[10px] text-slate-400 line-through">{formatPrice(product.originalPrice, currencyMode)}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onAddToCart(product.id, product.moq)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus size={14} /> شراء
                </button>
                <button 
                  onClick={() => onProductClick(product)}
                  className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
          ))}
          {products.filter(p => p.isHotSale).length === 0 && (
            <p className="text-red-400 text-center w-full py-10 font-bold">لا توجد عروض ساخنة حالياً</p>
          )}
        </div>
      </section>

      {/* Middle Banners */}
      <section className="grid grid-cols-2 gap-4 md:gap-6">
        {middleBanners.map((banner) => (
          <div 
            key={banner.id}
            onClick={() => banner.targetCategory && onBannerClick(banner.targetCategory)}
            className="relative h-32 sm:h-48 md:h-64 rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg"
          >
            <img 
              src={banner.image} 
              alt={banner.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-4 md:px-8 text-white text-right">
              <h4 className="text-sm md:text-2xl font-black mb-1 md:mb-2 line-clamp-1">{banner.title}</h4>
              <p className="text-[10px] md:text-sm opacity-80 mb-2 md:mb-4 line-clamp-1">{banner.subtitle}</p>
              <button className="bg-white text-black px-3 md:px-6 py-1 md:py-2 rounded-full text-[8px] md:text-xs font-bold uppercase tracking-widest">{banner.cta}</button>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section id="new-arrivals">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h3 className="text-3xl font-black font-headline tracking-tight text-on-surface">منتجات مختارة</h3>
          </div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase cursor-pointer hover:underline">مشاهدة المزيد</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.filter(p => p.isFeatured).map((product) => (
            <div 
              key={product.id}
              className="bg-surface-container rounded-[2rem] p-4 shadow-sm group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/10"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-low mb-4">
                <img 
                  className={cn(
                    "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                    product.isAvailable === false && "grayscale opacity-50"
                  )}
                  src={product.image} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                  الحد الأدنى: {product.moq}
                </div>
                {product.isAvailable === false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full">غير متوفر حالياً</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category}</span>
                  <h4 className="font-bold text-sm leading-tight text-on-surface line-clamp-2 h-10">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-black text-lg">{formatPrice(product.price, currencyMode)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    disabled={product.isAvailable === false}
                    onClick={() => onAddToCart(product.id, product.moq)}
                    className={cn(
                      "flex-1 bg-primary text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-dark transition-colors flex items-center justify-center gap-1",
                      product.isAvailable === false && "bg-slate-300 cursor-not-allowed"
                    )}
                  >
                    <Plus size={14} /> شراء
                  </button>
                  <button 
                    onClick={() => onProductClick(product)}
                    className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center hover:bg-primary/5 transition-colors border border-primary/10"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 border-t border-surface-container-high">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black font-headline tracking-tight text-on-surface">العلامات التجارية الشائعة</h3>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">الكل</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brandLogos.map((brand) => (
            <motion.div 
              key={brand.id} 
              whileHover={{ y: -5 }}
              onClick={() => onBrandClick(brand.id)}
              className="bg-white border border-surface-container-high rounded-2xl p-6 flex items-center justify-center h-28 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-40 group-hover:opacity-100" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
const BrandProductsScreen = ({ 
  brand, 
  products, 
  onProductClick, 
  onAddToCart,
  currencyMode,
  onBack
}: { 
  brand: BrandLogo, 
  products: Product[], 
  onProductClick: (p: Product) => void, 
  onAddToCart: (id: string, q: number) => void,
  currencyMode: CurrencyMode,
  onBack: () => void,
  key?: React.Key
}) => {
  const brandProducts = products.filter(p => p.brandId === brand.id);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-3 bg-surface-container rounded-2xl text-on-surface hover:bg-surface-container-high transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl p-2 flex items-center justify-center shadow-sm border border-surface-container-high">
            <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="text-3xl font-black font-headline text-on-surface">{brand.name}</h2>
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest">{brandProducts.length} منتج</p>
          </div>
        </div>
      </div>

      {brandProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brandProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-surface-container rounded-[2rem] p-4 shadow-sm group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/10"
            >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-low mb-4">
                  <img 
                    className={cn(
                      "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                      product.isAvailable === false && "grayscale opacity-50"
                    )}
                    src={product.image} 
                    alt={product.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                    الحد الأدنى: {product.moq}
                  </div>
                  {product.isAvailable === false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full">غير متوفر حالياً</span>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category}</span>
                    <h4 className="font-bold text-sm leading-tight text-on-surface line-clamp-2 h-10">{product.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-black text-lg">{formatPrice(product.price, currencyMode)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      disabled={product.isAvailable === false}
                      onClick={() => onAddToCart(product.id, product.moq)}
                      className={cn(
                        "flex-1 bg-primary text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-dark transition-colors flex items-center justify-center gap-1",
                        product.isAvailable === false && "bg-slate-300 cursor-not-allowed"
                      )}
                    >
                      <Plus size={14} /> شراء
                    </button>
                    <button 
                      onClick={() => onProductClick(product)}
                      className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center hover:bg-primary/5 transition-colors border border-primary/10"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-container rounded-[3rem]">
          <p className="text-on-surface-variant font-bold">لا توجد منتجات لهذه العلامة التجارية حالياً</p>
        </div>
      )}
    </motion.div>
  );
};

const CategoriesScreen = ({ 
  categories, 
  products, 
  onProductClick, 
  onAddToCart,
  initialCategoryName,
  currencyMode
}: { 
  categories: Category[], 
  products: Product[], 
  onProductClick: (p: Product) => void, 
  onAddToCart: (id: string, q: number) => void,
  initialCategoryName?: string,
  currencyMode: CurrencyMode,
  key?: React.Key
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    initialCategoryName ? categories.find(c => c.name === initialCategoryName) || null : null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);

  useEffect(() => {
    if (initialCategoryName) {
      setSelectedCategory(categories.find(c => c.name === initialCategoryName) || null);
      setSelectedSubcategory(null);
    }
  }, [initialCategoryName, categories]);

  if (selectedSubcategory && selectedCategory) {
    const filteredProducts = products.filter(p => p.category === selectedCategory.name && p.subcategory === selectedSubcategory.name);
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <button onClick={() => setSelectedSubcategory(null)} className="flex items-center gap-2 text-primary font-bold">
          <ChevronRight size={20} />
          العودة لـ {selectedCategory.name}
        </button>
        <h2 className="text-3xl font-black font-headline">{selectedSubcategory.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-surface-container rounded-[2rem] p-4 shadow-sm group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/10"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-low mb-4">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={product.image} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm leading-tight text-on-surface line-clamp-2 h-10">{product.name}</h4>
                  <span className="text-primary font-black text-lg">{formatPrice(product.price, currencyMode)}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onAddToCart(product.id, product.moq)}
                    className="flex-1 bg-primary text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-dark transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus size={14} /> شراء
                  </button>
                  <button 
                    onClick={() => onProductClick(product)}
                    className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center hover:bg-primary/5 transition-colors border border-primary/10"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-on-surface-variant text-center py-10">لا توجد منتجات في هذه الفئة حالياً</p>
          )}
        </div>
      </motion.div>
    );
  }

  if (selectedCategory) {
    const categoryProducts = products.filter(p => p.category === selectedCategory.name);
    
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-12"
      >
        <div className="space-y-4">
          <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-primary font-bold">
            <ChevronRight size={20} />
            العودة للفئات الرئيسية
          </button>
          <h2 className="text-4xl font-black font-headline text-on-surface">{selectedCategory.name}</h2>
        </div>

        {/* Subcategories Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-on-surface-variant uppercase tracking-widest">الفئات الفرعية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCategory.subcategories?.map((sub) => (
              <div 
                key={sub.name} 
                onClick={() => setSelectedSubcategory(sub)}
                className="relative h-40 rounded-[2rem] overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={sub.image} 
                  alt={sub.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center items-start px-8 text-white text-right">
                  <h3 className="text-2xl font-black font-headline mb-1">{sub.name}</h3>
                  <button className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">عرض الكل</button>
                </div>
              </div>
            ))}
            {(!selectedCategory.subcategories || selectedCategory.subcategories.length === 0) && (
              <p className="text-on-surface-variant text-center py-10">لا توجد فئات فرعية متاحة حالياً</p>
            )}
          </div>
        </div>

        {/* All Category Products */}
        <div className="space-y-8 pt-8 border-t border-surface-container-high">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-on-surface-variant uppercase tracking-widest">جميع منتجات {selectedCategory.name}</h3>
            <span className="bg-surface-container px-4 py-1 rounded-full text-xs font-bold text-primary">{categoryProducts.length} منتج</span>
          </div>
          
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-surface-container rounded-[2rem] p-4 shadow-sm group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/10"
                >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-low mb-4">
                  <img 
                    className={cn(
                      "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                      product.isAvailable === false && "grayscale opacity-50"
                    )}
                    src={product.image} 
                    alt={product.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                    الحد الأدنى: {product.moq}
                  </div>
                  {product.isAvailable === false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full">غير متوفر حالياً</span>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.subcategory || selectedCategory.name}</span>
                    <h4 className="font-bold text-sm leading-tight text-on-surface line-clamp-2 h-10">{product.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-black text-lg">{formatPrice(product.price, currencyMode)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      disabled={product.isAvailable === false}
                      onClick={() => onAddToCart(product.id, product.moq)}
                      className={cn(
                        "flex-1 bg-primary text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-dark transition-colors flex items-center justify-center gap-1",
                        product.isAvailable === false && "bg-slate-300 cursor-not-allowed"
                      )}
                    >
                      <Plus size={14} /> شراء
                    </button>
                    <button 
                      onClick={() => onProductClick(product)}
                      className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center hover:bg-primary/5 transition-colors border border-primary/10"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-container rounded-[3rem]">
              <p className="text-on-surface-variant font-bold">لا توجد منتجات في هذه الفئة حالياً</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="mb-6">
        <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">جميع الفئات</h2>
        <p className="text-on-surface-variant font-medium mt-2">استكشف منتجاتنا حسب التصنيف</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.name} 
            onClick={() => setSelectedCategory(cat)}
            className="relative h-48 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-10 text-white text-right">
              <h3 className="text-3xl font-black font-headline mb-2">{cat.name}</h3>
              <p className="text-sm opacity-80 mb-4">اكتشف منتجاتنا المميزة</p>
              <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">عرض الفئة</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const AdminScreen = ({ 
  products, 
  categories, 
  promoSlides, 
  middleBanners,
  brandLogos,
  settings,
  setProducts, 
  setCategories, 
  setPromoSlides,
  setMiddleBanners,
  setBrandLogos,
  setSettings,
  currencyMode
}: { 
  products: Product[], 
  categories: Category[], 
  promoSlides: PromoSlide[],
  middleBanners: MiddleBanner[],
  brandLogos: BrandLogo[],
  settings: AppSettings,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setPromoSlides: React.Dispatch<React.SetStateAction<PromoSlide[]>>,
  setMiddleBanners: React.Dispatch<React.SetStateAction<MiddleBanner[]>>,
  setBrandLogos: React.Dispatch<React.SetStateAction<BrandLogo[]>>,
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>,
  currencyMode: CurrencyMode
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'slider' | 'middleBanners' | 'brands' | 'settings'>('products');
  
  // Form States
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [editingSlide, setEditingSlide] = useState<Partial<PromoSlide> | null>(null);
  const [editingMiddleBanner, setEditingMiddleBanner] = useState<Partial<MiddleBanner> | null>(null);
  const [editingBrand, setEditingBrand] = useState<Partial<BrandLogo> | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '100100Hh@') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    if (editingProduct.id) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct } as Product : p));
    } else {
      const newProduct = { ...editingProduct, id: Math.random().toString(36).substr(2, 9) } as Product;
      setProducts(prev => [...prev, newProduct]);
    }
    setEditingProduct(null);
  };

  const saveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    const existingIndex = categories.findIndex(c => c.name === editingCategory.name);
    if (existingIndex > -1) {
      setCategories(prev => prev.map(c => c.name === editingCategory.name ? { ...c, ...editingCategory } as Category : c));
    } else {
      setCategories(prev => [...prev, editingCategory as Category]);
    }
    setEditingCategory(null);
  };

  const saveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    
    if (editingSlide.id) {
      setPromoSlides(prev => prev.map(s => s.id === editingSlide.id ? { ...s, ...editingSlide } as PromoSlide : s));
    } else {
      const newSlide = { ...editingSlide, id: Date.now() } as PromoSlide;
      setPromoSlides(prev => [...prev, newSlide]);
    }
    setEditingSlide(null);
  };

  const saveMiddleBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMiddleBanner) return;
    
    if (editingMiddleBanner.id) {
      setMiddleBanners(prev => prev.map(b => b.id === editingMiddleBanner.id ? { ...b, ...editingMiddleBanner } as MiddleBanner : b));
    } else {
      const newBanner = { ...editingMiddleBanner, id: Date.now() } as MiddleBanner;
      setMiddleBanners(prev => [...prev, newBanner]);
    }
    setEditingMiddleBanner(null);
  };

  const saveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand) return;
    
    if (editingBrand.id) {
      setBrandLogos(prev => prev.map(b => b.id === editingBrand.id ? { ...b, ...editingBrand } as BrandLogo : b));
    } else {
      const newBrand = { ...editingBrand, id: Date.now() } as BrandLogo;
      setBrandLogos(prev => [...prev, newBrand]);
    }
    setEditingBrand(null);
  };

  if (!isAuthenticated) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto mt-20 p-10 bg-surface-container rounded-[3rem] shadow-2xl text-center"
      >
        <ShieldCheck size={64} className="mx-auto text-primary mb-6" />
        <h2 className="text-3xl font-black font-headline mb-4 text-on-surface">دخول المسؤول</h2>
        <p className="text-on-surface-variant mb-8">يرجى إدخال كلمة المرور للوصول إلى لوحة التحكم</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 text-center focus:ring-2 focus:ring-primary/20 outline-none"
          />
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <button type="submit" className="w-full editorial-gradient text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
            دخول
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-10 pb-20"
    >
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">
            لوحة <span className="text-primary">التحكم</span>
          </h2>
          <p className="text-on-surface-variant mt-2">أدر متجرك، منتجاتك، وإعدادات المنصة</p>
        </div>
        <div className="flex gap-4">
          {activeTab === 'products' && (
            <button onClick={() => setEditingProduct({ name: '', price: 0, originalPrice: 0, moq: 1, image: '', category: categories[0]?.name || '', sku: '', rating: 5, reviews: 0, brandId: undefined })} className="editorial-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
              <Plus size={20} /> إضافة منتج
            </button>
          )}
          {activeTab === 'categories' && (
            <button onClick={() => setEditingCategory({ name: '', image: '', subcategories: [] })} className="editorial-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
              <Plus size={20} /> إضافة فئة
            </button>
          )}
          {activeTab === 'slider' && (
            <button onClick={() => setEditingSlide({ title: '', subtitle: '', image: '', cta: 'تسوق الآن' })} className="editorial-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
              <Plus size={20} /> إضافة سلايد
            </button>
          )}
          {activeTab === 'middleBanners' && (
            <button onClick={() => setEditingMiddleBanner({ title: '', subtitle: '', image: '', cta: 'تسوق الآن' })} className="editorial-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
              <Plus size={20} /> إضافة بنر
            </button>
          )}
          {activeTab === 'brands' && (
            <button onClick={() => setEditingBrand({ name: '', logo: '' })} className="editorial-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
              <Plus size={20} /> إضافة علامة تجارية
            </button>
          )}
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-surface-container-high overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'products', label: 'المنتجات' },
          { id: 'categories', label: 'الفئات' },
          { id: 'slider', label: 'السلايدر العلوي' },
          { id: 'middleBanners', label: 'البنرات الوسطى' },
          { id: 'brands', label: 'العلامات التجارية' },
          { id: 'settings', label: 'الإعدادات' },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "font-bold pb-2 whitespace-nowrap transition-all",
              activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-surface-container p-4 rounded-2xl flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center gap-6">
                  <img src={p.image} className="w-16 h-16 rounded-xl object-cover bg-surface-container-low" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-on-surface">{p.name}</h4>
                    <p className="text-xs text-on-surface-variant">{p.category} {p.subcategory && `> ${p.subcategory}`} • {p.sku}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {p.isHotSale && <span className="bg-red-100 text-red-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Hot</span>}
                      {p.isFeatured && <span className="bg-blue-100 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Featured</span>}
                      {p.isAvailable === false ? 
                        <span className="bg-slate-200 text-slate-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Unavailable</span> :
                        <span className="bg-green-100 text-green-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Available</span>
                      }
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-black text-primary">{formatPrice(p.price, currencyMode)}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase">MOQ: {p.moq}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProduct(p)} className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
                      <Settings size={18} />
                    </button>
                    <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map(c => (
              <div key={c.name} className="bg-surface-container p-6 rounded-3xl flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center gap-6">
                  <img src={c.image} className="w-20 h-20 rounded-2xl object-cover bg-surface-container-low" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-xl text-on-surface">{c.name}</h4>
                    <p className="text-xs text-on-surface-variant mt-1">{c.subcategories?.length || 0} فئات فرعية</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingCategory(c)} className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
                    <Settings size={20} />
                  </button>
                  <button onClick={() => setCategories(categories.filter(item => item.name !== c.name))} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'slider' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promoSlides.map(s => (
              <div key={s.id} className="bg-surface-container p-6 rounded-3xl flex flex-col gap-4 group hover:shadow-md transition-all">
                <img src={s.image} className="w-full h-40 rounded-2xl object-cover bg-surface-container-low" referrerPolicy="no-referrer" />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg text-on-surface">{s.title}</h4>
                    <p className="text-sm text-on-surface-variant">{s.subtitle}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingSlide(s)} className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
                      <Settings size={18} />
                    </button>
                    <button onClick={() => setPromoSlides(promoSlides.filter(item => item.id !== s.id))} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'middleBanners' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {middleBanners.map(b => (
              <div key={b.id} className="bg-surface-container p-6 rounded-3xl flex flex-col gap-4 group hover:shadow-md transition-all">
                <img src={b.image} className="w-full h-40 rounded-2xl object-cover bg-surface-container-low" referrerPolicy="no-referrer" />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg text-on-surface">{b.title}</h4>
                    <p className="text-sm text-on-surface-variant">{b.subtitle}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingMiddleBanner(b)} className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
                      <Settings size={18} />
                    </button>
                    <button onClick={() => setMiddleBanners(middleBanners.filter(item => item.id !== b.id))} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'brands' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brandLogos.map(b => (
              <div key={b.id} className="bg-surface-container p-4 rounded-3xl flex flex-col gap-4 group hover:shadow-md transition-all text-center">
                <div className="h-20 flex items-center justify-center bg-white rounded-2xl p-4">
                  <img src={b.logo} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold text-sm text-on-surface truncate">{b.name}</h4>
                <div className="flex justify-center gap-2">
                  <button onClick={() => setEditingBrand(b)} className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
                    <Settings size={16} />
                  </button>
                  <button onClick={() => setBrandLogos(brandLogos.filter(item => item.id !== b.id))} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-surface-container p-10 rounded-[3rem] space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-1">شعار الشركة (نص أو رابط صورة)</label>
                <input 
                  type="text" 
                  value={settings.logo}
                  onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                  className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-1">رقم واتساب المبيعات</label>
                <input 
                  type="text" 
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full bg-surface-container-high border-none rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>
            <div className="pt-4 flex items-center gap-3 text-primary font-bold">
              <CheckCircle2 size={20} />
              يتم حفظ التغييرات تلقائياً في الحالة المحلية
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.form 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={saveProduct}
              className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <h3 className="text-3xl font-black font-headline mb-6">{editingProduct.id ? 'تعديل منتج' : 'إضافة منتج جديد'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">اسم المنتج</label>
                  <input required type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">رمز المنتج (SKU)</label>
                  <input required type="text" value={editingProduct.sku} onChange={e => setEditingProduct({...editingProduct, sku: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">السعر الحالي</label>
                  <input required type="number" step="0.01" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">السعر الأصلي</label>
                  <input required type="number" step="0.01" value={editingProduct.originalPrice} onChange={e => setEditingProduct({...editingProduct, originalPrice: parseFloat(e.target.value)})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">الحد الأدنى للطلب (MOQ)</label>
                  <input required type="number" value={editingProduct.moq} onChange={e => setEditingProduct({...editingProduct, moq: parseInt(e.target.value)})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">رابط الصورة</label>
                  <input required type="text" value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">الفئة</label>
                  <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value, subcategory: ''})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none">
                    {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">الفئة الفرعية</label>
                  <select value={editingProduct.subcategory} onChange={e => setEditingProduct({...editingProduct, subcategory: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none">
                    <option value="">لا يوجد</option>
                    {categories.find(c => c.name === editingProduct.category)?.subcategories?.map(sc => <option key={sc.name} value={sc.name}>{sc.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">العلامة التجارية</label>
                  <select 
                    value={editingProduct.brandId || ""} 
                    onChange={e => setEditingProduct({...editingProduct, brandId: e.target.value ? parseInt(e.target.value) : undefined})} 
                    className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none"
                  >
                    <option value="">لا يوجد (None)</option>
                    {brandLogos.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-4 bg-surface-container p-6 rounded-3xl">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="isHotSale"
                      checked={editingProduct.isHotSale} 
                      onChange={e => setEditingProduct({...editingProduct, isHotSale: e.target.checked})}
                      className="w-5 h-5 rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="isHotSale" className="font-bold text-on-surface">عرض في "عروض ساخنة" على الصفحة الرئيسية</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="isFeatured"
                      checked={editingProduct.isFeatured} 
                      onChange={e => setEditingProduct({...editingProduct, isFeatured: e.target.checked})}
                      className="w-5 h-5 rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="isFeatured" className="font-bold text-on-surface">عرض في المنتجات المختارة على الصفحة الرئيسية</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="isAvailable"
                      checked={editingProduct.isAvailable !== false} 
                      onChange={e => setEditingProduct({...editingProduct, isAvailable: e.target.checked})}
                      className="w-5 h-5 rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="isAvailable" className="font-bold text-on-surface">المنتج متوفر للطلب</label>
                  </div>
                  {editingProduct.isAvailable === false && (
                    <p className="text-xs text-red-500 font-bold mr-8">سيظهر المنتج كـ "غير متوفر حالياً" حتى الدفعة القادمة</p>
                  )}
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 editorial-gradient text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg">حفظ</button>
                <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 bg-surface-container text-on-surface py-4 rounded-2xl font-black uppercase tracking-widest">إلغاء</button>
              </div>
            </motion.form>
          </div>
        )}

        {editingCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.form 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={saveCategory}
              className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl space-y-6"
            >
              <h3 className="text-3xl font-black font-headline mb-6">إدارة الفئة</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">اسم الفئة</label>
                  <input required type="text" value={editingCategory.name} onChange={e => setEditingCategory({...editingCategory, name: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">رابط الصورة</label>
                  <input required type="text" value={editingCategory.image} onChange={e => setEditingCategory({...editingCategory, image: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">الفئات الفرعية</label>
                  <div className="max-h-48 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {editingCategory.subcategories?.map((sub, idx) => (
                      <div key={idx} className="flex flex-col gap-2 bg-surface-container p-4 rounded-2xl border border-surface-container-high">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest">فئة فرعية #{idx + 1}</span>
                          <button 
                            type="button"
                            onClick={() => {
                              const newSubs = editingCategory.subcategories?.filter((_, i) => i !== idx);
                              setEditingCategory({...editingCategory, subcategories: newSubs});
                            }}
                            className="text-red-500 hover:bg-red-50 p-1 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <input 
                          type="text" 
                          placeholder="الاسم" 
                          value={sub.name} 
                          onChange={e => {
                            const newSubs = [...(editingCategory.subcategories || [])];
                            newSubs[idx] = { ...newSubs[idx], name: e.target.value };
                            setEditingCategory({...editingCategory, subcategories: newSubs});
                          }}
                          className="bg-white border-none rounded-xl px-4 py-2 text-sm outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="رابط الصورة" 
                          value={sub.image} 
                          onChange={e => {
                            const newSubs = [...(editingCategory.subcategories || [])];
                            newSubs[idx] = { ...newSubs[idx], image: e.target.value };
                            setEditingCategory({...editingCategory, subcategories: newSubs});
                          }}
                          className="bg-white border-none rounded-xl px-4 py-2 text-sm outline-none"
                        />
                      </div>
                    ))}
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      const newSubs = [...(editingCategory.subcategories || []), { name: '', image: '' }];
                      setEditingCategory({...editingCategory, subcategories: newSubs});
                    }}
                    className="w-full py-3 border-2 border-dashed border-primary/20 rounded-2xl text-primary text-xs font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={14} /> إضافة فئة فرعية جديدة
                  </button>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 editorial-gradient text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg">حفظ</button>
                <button type="button" onClick={() => setEditingCategory(null)} className="flex-1 bg-surface-container text-on-surface py-4 rounded-2xl font-black uppercase tracking-widest">إلغاء</button>
              </div>
            </motion.form>
          </div>
        )}

        {editingSlide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.form 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={saveSlide}
              className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl space-y-6"
            >
              <h3 className="text-3xl font-black font-headline mb-6">إدارة السلايدر العلوي</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">العنوان الرئيسي</label>
                  <input required type="text" value={editingSlide.title} onChange={e => setEditingSlide({...editingSlide, title: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">العنوان الفرعي</label>
                  <input required type="text" value={editingSlide.subtitle} onChange={e => setEditingSlide({...editingSlide, subtitle: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">رابط الصورة</label>
                  <input required type="text" value={editingSlide.image} onChange={e => setEditingSlide({...editingSlide, image: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">نص الزر</label>
                  <input required type="text" value={editingSlide.cta} onChange={e => setEditingSlide({...editingSlide, cta: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">الفئة المستهدفة</label>
                  <select 
                    value={editingSlide.targetCategory || ''} 
                    onChange={e => setEditingSlide({...editingSlide, targetCategory: e.target.value})} 
                    className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none"
                  >
                    <option value="">لا يوجد</option>
                    {categories.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 editorial-gradient text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg">حفظ</button>
                <button type="button" onClick={() => setEditingSlide(null)} className="flex-1 bg-surface-container text-on-surface py-4 rounded-2xl font-black uppercase tracking-widest">إلغاء</button>
              </div>
            </motion.form>
          </div>
        )}

        {editingMiddleBanner && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.form 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={saveMiddleBanner}
              className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl space-y-6"
            >
              <h3 className="text-3xl font-black font-headline mb-6">إدارة البنر الأوسط</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">العنوان الرئيسي</label>
                  <input required type="text" value={editingMiddleBanner.title} onChange={e => setEditingMiddleBanner({...editingMiddleBanner, title: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">العنوان الفرعي</label>
                  <input required type="text" value={editingMiddleBanner.subtitle} onChange={e => setEditingMiddleBanner({...editingMiddleBanner, subtitle: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">رابط الصورة</label>
                  <input required type="text" value={editingMiddleBanner.image} onChange={e => setEditingMiddleBanner({...editingMiddleBanner, image: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">نص الزر</label>
                  <input required type="text" value={editingMiddleBanner.cta} onChange={e => setEditingMiddleBanner({...editingMiddleBanner, cta: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">الفئة المستهدفة</label>
                  <select 
                    value={editingMiddleBanner.targetCategory || ''} 
                    onChange={e => setEditingMiddleBanner({...editingMiddleBanner, targetCategory: e.target.value})} 
                    className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none"
                  >
                    <option value="">لا يوجد</option>
                    {categories.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 editorial-gradient text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg">حفظ</button>
                <button type="button" onClick={() => setEditingMiddleBanner(null)} className="flex-1 bg-surface-container text-on-surface py-4 rounded-2xl font-black uppercase tracking-widest">إلغاء</button>
              </div>
            </motion.form>
          </div>
        )}
        {editingBrand && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.form 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={saveBrand}
              className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl space-y-6"
            >
              <h3 className="text-3xl font-black font-headline mb-6">إدارة العلامة التجارية</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">اسم العلامة التجارية</label>
                  <input required type="text" value={editingBrand.name} onChange={e => setEditingBrand({...editingBrand, name: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">رابط الشعار</label>
                  <input required type="text" value={editingBrand.logo} onChange={e => setEditingBrand({...editingBrand, logo: e.target.value})} className="w-full bg-surface-container border-none rounded-2xl px-4 py-3 outline-none" />
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 editorial-gradient text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg">حفظ</button>
                <button type="button" onClick={() => setEditingBrand(null)} className="flex-1 bg-surface-container text-on-surface py-4 rounded-2xl font-black uppercase tracking-widest">إلغاء</button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProductDetailScreen = ({ product, onBack, onAddToCart, products, onProductClick, currencyMode }: { 
  product: Product, 
  onBack: () => void, 
  onAddToCart: (id: string, q: number) => void,
  products: Product[],
  onProductClick: (p: Product) => void,
  currencyMode: CurrencyMode,
  key?: React.Key
}) => {
  const [qty, setQty] = useState(product.moq);

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pb-32"
    >
      {/* Image Carousel */}
      <section className="relative px-4 pt-4">
        <div className="aspect-[4/5] md:aspect-video w-full rounded-xl overflow-hidden bg-surface-container-low relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-8 h-1 bg-primary rounded-full" />
            <div className="w-2 h-1 bg-white/50 rounded-full" />
            <div className="w-2 h-1 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="px-6 py-8">
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">أداء متميز</span>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface leading-tight max-w-2xl">
            {product.name}
          </h2>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm">★</span>
              ))}
            </div>
            <span className="text-xs text-on-surface-variant font-medium">({product.rating} • {product.reviews} مراجعة)</span>
          </div>
        </div>

        {/* Pricing Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-high p-6 rounded-xl flex flex-col justify-center">
            <span className="text-on-surface text-xs font-bold uppercase tracking-wider mb-1">الحد الأدنى لطلب الجملة</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-on-surface">{product.moq}</span>
              <span className="text-sm font-medium text-on-surface/80">وحدة</span>
            </div>
          </div>
          <div className="md:col-span-2 bg-surface-container-low p-6 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">سعر الوحدة بالجملة</span>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-primary">{formatPrice(product.price, currencyMode)}</span>
                <div className="flex flex-col">
                  <span className="text-sm line-through text-on-surface-variant/60">{formatPrice(product.originalPrice, currencyMode)}</span>
                  <span className="text-xs font-bold text-primary-dark">خصم 52% عن سعر التجزئة</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">الإجمالي التقديري</span>
              <span className="text-xl font-bold text-on-surface">{formatPrice(product.price * qty, currencyMode)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Config */}
      <section className="px-6 pb-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-surface-container rounded-xl">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-on-surface">محدد الكمية</label>
            <p className="text-xs text-on-surface-variant">يجب أن يكون أكبر من أو يساوي الحد الأدنى للطلب ({product.moq})</p>
            {product.isAvailable === false && (
              <p className="text-sm font-black text-red-600 mt-2">عذراً، هذا المنتج غير متوفر حالياً حتى الدفعة القادمة</p>
            )}
          </div>
          <div className="flex items-center bg-surface-container-high rounded-full p-1 self-start md:self-auto">
            <button 
              disabled={product.isAvailable === false}
              onClick={() => setQty(Math.max(product.moq, qty - 1))}
              className={cn(
                "w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors",
                product.isAvailable === false && "opacity-30 cursor-not-allowed"
              )}
            >
              <Minus size={20} />
            </button>
            <input 
              disabled={product.isAvailable === false}
              className="w-16 bg-transparent border-none text-center font-bold text-lg focus:ring-0" 
              type="number" 
              value={qty}
              onChange={(e) => setQty(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
            />
            <button 
              disabled={product.isAvailable === false}
              onClick={() => setQty(qty + 1)}
              className={cn(
                "w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors",
                product.isAvailable === false && "opacity-30 cursor-not-allowed"
              )}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="flex gap-8 border-b border-surface-container-high overflow-x-auto pb-2 no-scrollbar">
            <button className="text-primary font-bold border-b-2 border-primary pb-2 whitespace-nowrap">الوصف</button>
            <button className="text-on-surface-variant font-medium pb-2 whitespace-nowrap">المواصفات</button>
            <button className="text-on-surface-variant font-medium pb-2 whitespace-nowrap">الشحن بالجملة</button>
          </div>
          <div className="text-on-surface-variant leading-relaxed">
            <p className="mb-4">
              مصمم للقوى العاملة الصناعية الحديثة. يجمع بين الراحة عالية الأداء والمتانة الصناعية، ويمثل هذا الطراز قمة أحذية السلامة الرياضية للشركات.
            </p>
            <ul className="space-y-3">
              {[
                "شبكة مسامية معززة مع مقاومة للتآكل مزدوجة الطبقات.",
                "نعل خارجي مقاوم للزيت ومضاد للانزلاق للبيئات الخطرة.",
                "نعل أوسط عالي الارتداد يوفر عودة الطاقة لفترات العمل الطويلة."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="px-6 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h3 className="text-2xl font-black font-headline tracking-tight text-on-surface">منتجات ذات صلة</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {relatedProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => onProductClick(p)}
                className="bg-surface-container rounded-2xl p-3 shadow-sm group cursor-pointer transition-all hover:shadow-md"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container-low mb-3">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={p.image} 
                    alt={p.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="font-bold text-xs text-on-surface truncate mb-1">{p.name}</h4>
                <p className="text-primary font-black text-sm">{formatPrice(p.price, currencyMode)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-2xl px-6 pt-3 pb-8 flex items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-xl">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">الإجمالي لـ {qty} وحدة</span>
          <span className="text-xl font-black text-on-surface">{formatPrice(product.price * qty, currencyMode)}</span>
        </div>
        <button 
          disabled={product.isAvailable === false}
          onClick={() => onAddToCart(product.id, qty)}
          className={cn(
            "flex-1 max-w-xs editorial-gradient text-white py-4 rounded-xl font-headline font-bold text-lg active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2",
            product.isAvailable === false && "bg-slate-300 from-slate-300 to-slate-400 cursor-not-allowed shadow-none"
          )}
        >
          <ShoppingCart size={20} fill="currentColor" />
          {product.isAvailable === false ? 'غير متوفر حالياً' : 'أضف إلى السلة'}
        </button>
      </footer>
    </motion.div>
  );
};

const CartScreen = ({ products, cart, setCart, currencyMode, whatsappNumber }: { products: Product[], cart: CartItem[], setCart: React.Dispatch<React.SetStateAction<CartItem[]>>, currencyMode: CurrencyMode, whatsappNumber: string, key?: React.Key }) => {
  const cartProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...product, quantity: item.quantity };
  }).filter(item => item.id !== undefined) as (Product & { quantity: number })[];

  const subtotal = cartProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;
  const totalUnits = cartProducts.reduce((acc, item) => acc + item.quantity, 0);

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const product = products.find(p => p.id === productId);
        const min = product?.moq || 1;
        return { ...item, quantity: Math.max(min, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const handleCheckout = () => {
    const madTotal = total.toFixed(2);
    const rialTotal = (total * 20).toLocaleString();
    
    let message = `*طلب جديد من المتجر*\n\n`;
    message += `*تفاصيل المنتجات:*\n`;
    
    cartProducts.forEach((item, index) => {
      const itemMad = (item.price * item.quantity).toFixed(2);
      const itemRial = (item.price * item.quantity * 20).toLocaleString();
      message += `${index + 1}. ${item.name}\n`;
      message += `   الكمية: ${item.quantity}\n`;
      message += `   السعر: ${itemMad} د.م. (${itemRial} ريال)\n\n`;
    });
    
    message += `--------------------------\n`;
    message += `*إجمالي الوحدات:* ${totalUnits} وحدة\n`;
    message += `*المبلغ الإجمالي:* ${madTotal} د.م.\n`;
    message += `*المبلغ بالريال:* ${rialTotal} ريال\n\n`;
    message += `شكراً لتسوقكم معنا!`;

    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-32 h-32 bg-surface-container rounded-full flex items-center justify-center mb-6">
          <ShoppingCart size={48} className="text-on-surface-variant opacity-20" />
        </div>
        <h2 className="text-2xl font-black mb-2">سلتك فارغة</h2>
        <p className="text-on-surface-variant mb-8">ابدأ بإضافة بعض المنتجات الرائعة إلى سلتك</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="pb-40"
    >
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">مراجعة السلة</h2>
        <p className="text-on-surface-variant font-medium mt-2">طلب جملة B2B</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartProducts.map((item) => (
            <div key={item.id} className={cn(
              "bg-surface-container p-6 rounded-lg flex gap-6 items-center shadow-sm relative",
              item.quantity < item.moq && "border-2 border-red-100"
            )}>
              <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-surface-container-low">
                <img className="w-full h-full object-cover" src={item.image} alt="" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl text-on-surface">{item.name}</h3>
                    <p className="text-sm text-on-surface-variant">رمز المنتج: {item.sku}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-black text-lg text-primary">{formatPrice(item.price * item.quantity, currencyMode)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition-colors mt-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 bg-surface-container-low rounded-full px-4 py-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-on-surface-variant">
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-on-surface px-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-primary">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">سعر الوحدة: {formatPrice(item.price, currencyMode)}</p>
                  </div>
                </div>
                {item.quantity < item.moq && (
                  <div className="mt-4 bg-red-50 text-red-700 px-4 py-3 rounded-md flex items-center gap-3">
                    <ShieldCheck size={20} className="text-red-500" />
                    <p className="text-sm font-semibold">لم يتم استيفاء الحد الأدنى للطلب ({item.moq}).</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-low p-8 rounded-lg sticky top-24">
            <h3 className="text-2xl font-extrabold mb-6 font-headline">ملخص الطلب</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-medium">إجمالي الوحدات</span>
                <span className="font-bold">{totalUnits} وحدة</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-medium">المجموع الفرعي</span>
                <span className="font-bold">{formatPrice(subtotal, currencyMode)}</span>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-container-high">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">السعر الإجمالي</span>
                  <div className="text-right">
                    <p className="text-xs font-black uppercase text-primary tracking-widest leading-none mb-1">الفاتورة النهائية</p>
                    <span className="text-3xl font-black text-on-surface">{formatPrice(total, currencyMode)}</span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full mt-8 editorial-gradient text-white py-5 rounded-xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 duration-200 shadow-xl shadow-primary/20"
            >
              <Send size={20} /> اطلب عبر واتساب
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  
  // Editable State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [promoSlides, setPromoSlides] = useState<PromoSlide[]>(PROMO_SLIDES);
  const [middleBanners, setMiddleBanners] = useState<MiddleBanner[]>(MIDDLE_BANNERS);
  const [brandLogos, setBrandLogos] = useState<BrandLogo[]>(BRANDS);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('MAD');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen, selectedProduct, initialCategory, selectedBrandId]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setScreen('detail');
  };

  const handleCategoryClick = (catName: string) => {
    setInitialCategory(catName);
    setScreen('categories');
  };

  const handleBannerClick = (catName: string) => {
    setInitialCategory(catName);
    setScreen('categories');
  };

  const handleBrandClick = (brandId: number) => {
    setSelectedBrandId(brandId);
    setScreen('brand');
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { productId, quantity }];
    });
  };

  const handleBack = () => {
    setScreen('home');
    setSelectedProduct(null);
    setInitialCategory(undefined);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setScreen('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar 
        title={
          screen === 'admin' ? 'لوحة التحكم' : 
          screen === 'cart' ? 'سلتي' : 
          screen === 'categories' ? 'الفئات' :
          undefined
        }
        onBack={screen !== 'home' ? handleBack : undefined}
        showSearch={screen === 'home'}
        logo={settings.logo}
        cartCount={cart.length}
        onCartClick={() => setScreen('cart')}
        onMenuClick={() => setIsMenuOpen(true)}
        currencyMode={currencyMode}
        onToggleCurrency={() => setCurrencyMode(prev => prev === 'MAD' ? 'RIAL' : 'MAD')}
      />

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-2xl font-black font-headline text-primary">القائمة</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <ArrowLeft size={24} />
                </button>
              </div>

              <div className="p-6 space-y-8 overflow-y-auto flex-grow">
                {/* Search Bar in Menu */}
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-12 pl-4 focus:ring-2 focus:ring-primary/20 outline-none font-medium text-right"
                    dir="rtl"
                  />
                </div>

                {searchQuery && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 text-right">نتائج البحث</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {products
                        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 5)
                        .map(p => (
                          <button 
                            key={p.id}
                            onClick={() => { handleProductClick(p); setIsMenuOpen(false); setSearchQuery(''); }}
                            className="flex items-center justify-end gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all text-right"
                          >
                            <div className="flex-grow">
                              <h4 className="text-sm font-bold text-on-surface line-clamp-1">{p.name}</h4>
                              <p className="text-[10px] text-primary font-black">{formatPrice(p.price, currencyMode)}</p>
                            </div>
                            <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          </button>
                        ))
                      }
                      {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-4">لم يتم العثور على نتائج</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 text-right">روابط سريعة</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => { setScreen('home'); setIsMenuOpen(false); }}
                      className="flex items-center justify-end gap-4 p-4 rounded-2xl hover:bg-primary/5 text-on-surface font-bold transition-all group"
                    >
                      <span>الرئيسية</span>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <HomeIcon size={20} />
                      </div>
                    </button>
                    <button 
                      onClick={() => scrollToSection('new-arrivals')}
                      className="flex items-center justify-end gap-4 p-4 rounded-2xl hover:bg-primary/5 text-on-surface font-bold transition-all group"
                    >
                      <span>وصل حديثاً</span>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <TrendingUp size={20} />
                      </div>
                    </button>
                    <button 
                      onClick={() => scrollToSection('special-offers')}
                      className="flex items-center justify-end gap-4 p-4 rounded-2xl hover:bg-primary/5 text-on-surface font-bold transition-all group"
                    >
                      <span>عروض خاصة</span>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Plus size={20} />
                      </div>
                    </button>
                    <button 
                      onClick={() => { setScreen('categories'); setIsMenuOpen(false); }}
                      className="flex items-center justify-end gap-4 p-4 rounded-2xl hover:bg-primary/5 text-on-surface font-bold transition-all group"
                    >
                      <span>تصفح الفئات</span>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Grid size={20} />
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 text-right">تواصل معنا</h3>
                  <div className="bg-slate-50 p-6 rounded-[2rem] space-y-4 text-right">
                    <p className="text-sm text-slate-600 leading-relaxed">هل لديك أي استفسار؟ نحن هنا لمساعدتك في طلبات الجملة.</p>
                    <button 
                      onClick={() => window.open(`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`, '_blank')}
                      className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                    >
                      <Send size={18} /> واتساب مباشر
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-widest">
                  <span>© 2026 نينا بزار</span>
                  <span>v2.4.0</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main className="pt-20 pb-32 px-4 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <HomeScreen 
              key="home" 
              onProductClick={handleProductClick} 
              onAddToCart={handleAddToCart}
              onCategoryClick={handleCategoryClick}
              onBannerClick={handleBannerClick}
              products={products}
              categories={categories}
              promoSlides={promoSlides}
              middleBanners={middleBanners}
              brandLogos={brandLogos}
              currencyMode={currencyMode}
              onBrandClick={handleBrandClick}
            />
          )}
          {screen === 'brand' && selectedBrandId && (
            <BrandProductsScreen 
              key={`brand-${selectedBrandId}`}
              brand={brandLogos.find(b => b.id === selectedBrandId)!}
              products={products}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
              currencyMode={currencyMode}
              onBack={() => setScreen('home')}
            />
          )}
          {screen === 'categories' && (
            <CategoriesScreen 
              key="categories" 
              categories={categories}
              products={products}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
              initialCategoryName={initialCategory}
              currencyMode={currencyMode}
            />
          )}
          {screen === 'detail' && selectedProduct && (
            <ProductDetailScreen 
              key={selectedProduct.id} 
              product={selectedProduct} 
              onBack={handleBack} 
              onAddToCart={handleAddToCart}
              products={products}
              onProductClick={handleProductClick}
              currencyMode={currencyMode}
            />
          )}
          {screen === 'cart' && (
            <CartScreen key="cart" products={products} cart={cart} setCart={setCart} currencyMode={currencyMode} whatsappNumber={settings.whatsappNumber} />
          )}
          {screen === 'admin' && (
            <AdminScreen 
              products={products}
              categories={categories}
              promoSlides={promoSlides}
              middleBanners={middleBanners}
              brandLogos={brandLogos}
              settings={settings}
              setProducts={setProducts}
              setCategories={setCategories}
              setPromoSlides={setPromoSlides}
              setMiddleBanners={setMiddleBanners}
              setBrandLogos={setBrandLogos}
              setSettings={setSettings}
              currencyMode={currencyMode}
            />
          )}
        </AnimatePresence>
      </main>

      {screen !== 'detail' && (
        <BottomNavBar activeScreen={screen} setScreen={setScreen} cartCount={cart.length} />
      )}
    </div>
  );
}
