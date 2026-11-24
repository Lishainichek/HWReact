import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Badge, Button, Card, GlobalStyle, Grid, Input } from './ui';
import type { ButtonSize } from './ui';
import { darkTheme, lightTheme } from './theme';
import type { ButtonVariant, ThemeMode } from './theme';

type Category = 'Электроника' | 'Для дома' | 'Аксессуары';
type Filter = 'Все' | Category;

interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  emoji: string;
  isNew?: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Беспроводные наушники', description: 'Для музыки и прогулок', category: 'Электроника', price: 3490, emoji: '🎧', isNew: true },
  { id: 2, name: 'Настольная лампа', description: 'Мягкий свет для работы', category: 'Для дома', price: 1890, emoji: '💡' },
  { id: 3, name: 'Рюкзак на каждый день', description: 'Удобный и вместительный', category: 'Аксессуары', price: 2690, emoji: '🎒', isNew: true },
  { id: 4, name: 'Механическая клавиатура', description: 'Компактная и удобная', category: 'Электроника', price: 5290, emoji: '⌨️' },
  { id: 5, name: 'Термокружка', description: 'Сохраняет напиток горячим', category: 'Для дома', price: 990, emoji: '☕' },
  { id: 6, name: 'Солнцезащитные очки', description: 'Для ярких дней', category: 'Аксессуары', price: 1490, emoji: '🕶️' },
  { id: 7, name: 'Беспроводная мышь', description: 'Для учёбы и работы', category: 'Электроника', price: 1990, emoji: '🖱️' },
  { id: 8, name: 'Комнатное растение', description: 'Немного уюта дома', category: 'Для дома', price: 790, emoji: '🪴' },
];

const filters: Filter[] = ['Все', 'Электроника', 'Для дома', 'Аксессуары'];
const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'danger'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem('mini-market-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 22px 32px 70px;
  @media (max-width: 600px) { padding: 16px 16px 50px; }
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 26px;
`;
const Brand = styled.div`
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.7px;
`;
const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
`;
const CartIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font-weight: 650;
  font-size: 13px;
`;
const CartCount = styled.span`
  display: inline-block;
  min-width: 25px;
  padding: 2px 6px;
  border-radius: 8px;
  text-align: center;
  background: ${({ theme }) => theme.colors.mutedSurface};
`;
const Hero = styled.section`
  padding: 38px 42px;
  background: ${({ theme }) => theme.colors.hero};
  border-radius: 22px;
  @media (max-width: 600px) { padding: 27px 22px; }
`;
const Eyebrow = styled.p`
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;
const HeroTitle = styled.h1`
  font-size: clamp(30px, 4.3vw, 48px);
  line-height: 1.12;
  letter-spacing: -1.3px;
  margin: 0 0 12px;
`;
const Subtext = styled.p`
  color: ${({ theme }) => theme.colors.mutedText};
  margin: 0;
`;
const SectionHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 10px;
  margin: 35px 0 18px;
`;
const Title = styled.h2`
  font-size: 24px;
  line-height: 1.25;
  margin: 0;
  letter-spacing: -0.5px;
`;
const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  margin-bottom: 20px;
`;
const SearchBox = styled.div`
  flex: 1 1 270px;
`;
const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const ProductArt = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  height: 152px;
  background: ${({ theme }) => theme.colors.mutedSurface};
  font-size: 66px;
`;
const ProductFlag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: initial;
`;
const ProductBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 17px;
`;
const ProductCategory = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
  margin-bottom: 6px;
`;
const ProductTitle = styled.h3`
  font-size: 16px;
  line-height: 1.3;
  margin: 0 0 5px;
`;
const ProductDescription = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin: 0 0 18px;
`;
const ProductBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto;
`;
const Price = styled.strong`
  font-size: 18px;
  white-space: nowrap;
`;
const EmptyState = styled.div`
  padding: 45px 20px;
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
`;
const Kit = styled.div`
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 17px;
  background: ${({ theme }) => theme.colors.surface};
`;
const KitRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 11px 0;
`;
const KitLabel = styled.span`
  width: 95px;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
`;
const KitButtons = styled.div`
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
`;
const EmptyAction = styled.div`
  margin-top: 18px;
`;
const Footer = styled.footer`
  padding-top: 35px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;
`;

export default function App() {
  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Filter>('Все');
  const [cartCount, setCartCount] = useState(0);
  const [addingIds, setAddingIds] = useState<number[]>([]);

  useEffect(() => {
    localStorage.setItem('mini-market-theme', mode);
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const filtered = products.filter((product) => {
    const matchesCategory = category === 'Все' || product.category === category;
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function addToCart(id: number) {
    setAddingIds((prev) => [...prev, id]);
    window.setTimeout(() => {
      setCartCount((prev) => prev + 1);
      setAddingIds((prev) => prev.filter((item) => item !== id));
    }, 550);
  }

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Page>
        <Header>
          <Brand>mini<span aria-hidden="true">✦</span>market</Brand>
          <HeaderActions>
            <Button variant="outline" size="sm" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
              {mode === 'light' ? '☾ Тёмная тема' : '☀ Светлая тема'}
            </Button>
            <CartIndicator aria-label={`Товаров в корзине: ${cartCount}`}>
              Корзина <CartCount>{cartCount}</CartCount>
            </CartIndicator>
          </HeaderActions>
        </Header>

        <Hero>
          <Eyebrow>Небольшой магазин полезных вещей</Eyebrow>
          <HeroTitle>Простые вещи.<br />Хороший выбор.</HeroTitle>
          <Subtext>Выбирайте товары, ищите по названию и добавляйте в корзину.</Subtext>
        </Hero>

        <SectionHead>
          <Title>Каталог товаров</Title>
          <Subtext>Найдено: {filtered.length}</Subtext>
        </SectionHead>
        <Controls>
          <SearchBox>
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по каталогу..." aria-label="Поиск товаров" />
          </SearchBox>
          <FilterButtons role="group" aria-label="Категории товаров">
            {filters.map((filter) => (
              <Button key={filter} size="sm" variant={category === filter ? 'primary' : 'secondary'} onClick={() => setCategory(filter)} aria-pressed={category === filter}>
                {filter}
              </Button>
            ))}
          </FilterButtons>
        </Controls>

        {filtered.length === 0 ? (
          <EmptyState>
            <Title>Ничего не найдено</Title>
            <Subtext>Попробуйте другой запрос или сбросьте фильтр.</Subtext>
            <EmptyAction>
              <Button onClick={() => { setSearch(''); setCategory('Все'); }}>Сбросить фильтры</Button>
            </EmptyAction>
          </EmptyState>
        ) : (
          <Grid>
            {filtered.map((product) => (
              <Card key={product.id}>
                <ProductArt role="img" aria-label={product.name}>
                  {product.emoji}
                  {product.isNew && <ProductFlag><Badge>Новинка</Badge></ProductFlag>}
                </ProductArt>
                <ProductBody>
                  <ProductCategory>{product.category}</ProductCategory>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductBottom>
                    <Price>{product.price.toLocaleString('ru-RU')} ₽</Price>
                    <Button size="sm" loading={addingIds.includes(product.id)} onClick={() => addToCart(product.id)}>
                      В корзину
                    </Button>
                  </ProductBottom>
                </ProductBody>
              </Card>
            ))}
          </Grid>
        )}

        <SectionHead>
          <div>
            <Title>Наш UI-кит</Title>
            <Subtext>Четыре варианта кнопок в трёх размерах, состояния и бейджи.</Subtext>
          </div>
        </SectionHead>
        <Kit>
          {variants.map((variant) => (
            <KitRow key={variant}>
              <KitLabel>{variant}</KitLabel>
              <KitButtons>
                {sizes.map((size) => <Button key={size} variant={variant} size={size}>{size.toUpperCase()}</Button>)}
              </KitButtons>
            </KitRow>
          ))}
          <KitRow>
            <KitLabel>Состояния</KitLabel>
            <KitButtons>
              <Button loading>Загрузка</Button>
              <Button disabled variant="outline">Недоступно</Button>
              <Badge>Новинка</Badge>
              <Badge muted>Обычный</Badge>
            </KitButtons>
          </KitRow>
        </Kit>
        <Footer>Учебный проект на React + TypeScript + styled-components</Footer>
      </Page>
    </ThemeProvider>
  );
}
