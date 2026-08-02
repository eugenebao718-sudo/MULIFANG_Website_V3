import { products, type Product } from "@/data/products";
import type { Locale } from "./config";

const zhNames: Record<string, string> = {
  "MF-LR-TV1800":"NEST 1800 电视柜", "MF-LR-CT1100":"LIFT 1100 升降茶几", "MF-LR-SF1800":"HAVEN 三人沙发", "MF-LR-SB1900":"FLEX 1900 沙发床", "MF-ST-SC1200":"LINEA 1200 餐边柜", "MF-ST-SH800":"BREEZE 800 鞋柜", "MF-ST-BS1200":"GRID 1200 展示架", "MF-ST-BN1000":"TIDY 1000 储物凳", "MF-ST-DR1200":"CALM 六斗柜", "MF-BR-BD1500":"REST 大号储物床", "MF-BR-WR1800":"SLIDE 1800 衣柜", "MF-BR-NS500":"QUIET 双抽床头柜", "MF-BR-DT1000":"GLOW 梳妆台与凳", "MF-DR-ET1400":"GATHER 延伸餐桌", "MF-DR-DC450":"ARC 餐椅", "MF-DR-DS1400":"FAMILY 四人餐桌椅套装", "MF-DR-BS1200":"SOCIAL 吧台套装", "MF-OF-DS1200":"FOCUS 1200 办公桌", "MF-OF-MP400":"MOVE 移动文件柜", "MF-KT-PC1000":"PANTRY 1000 多功能高柜",
  "MF-CUS-001":"定制厨房柜体", "MF-CUS-002":"现代红色厨房", "MF-CUS-003":"现代黄色厨房", "MF-CUS-004":"厨房岛台系统", "MF-CUS-005":"衣柜与高柜收纳", "MF-CUS-006":"步入式衣帽间", "MF-CUS-007":"电视墙系统", "MF-CUS-008":"展示与特色柜体", "MF-CUS-009":"玄关与走廊柜体", "MF-CUS-010":"悬浮柜体", "MF-CUS-011":"装饰展示架", "MF-CUS-012":"紧凑型吧台", "MF-CUS-013":"餐饮与展示吧台", "MF-CUS-014":"客厅家具", "MF-CUS-015":"卧室家具", "MF-CUS-016":"办公家具", "MF-CUS-017":"酒店家具", "MF-CUS-018":"公寓家具", "MF-CUS-019":"商业家具", "MF-CUS-020":"实木门", "MF-CUS-021":"定制门板", "MF-CUS-022":"PVC 吸塑门板", "MF-CUS-023":"移门与隔断系统", "MF-CUS-024":"断桥铝窗", "MF-CUS-025":"铝合金门窗系统", "MF-CUS-026":"高端弹簧床垫", "MF-CUS-027":"全屋定制家具"
};
const koNames: Record<string, string> = {
  "MF-LR-TV1800":"NEST 1800 TV 콘솔", "MF-LR-CT1100":"LIFT 1100 리프트업 커피 테이블", "MF-LR-SF1800":"HAVEN 3인용 소파", "MF-LR-SB1900":"FLEX 1900 소파베드", "MF-ST-SC1200":"LINEA 1200 사이드보드", "MF-ST-SH800":"BREEZE 800 신발장", "MF-ST-BS1200":"GRID 1200 디스플레이 선반", "MF-ST-BN1000":"TIDY 1000 수납 벤치", "MF-ST-DR1200":"CALM 6단 서랍장", "MF-BR-BD1500":"REST 퀸 수납 침대", "MF-BR-WR1800":"SLIDE 1800 옷장", "MF-BR-NS500":"QUIET 2단 협탁", "MF-BR-DT1000":"GLOW 화장대와 스툴", "MF-DR-ET1400":"GATHER 확장형 테이블", "MF-DR-DC450":"ARC 다이닝 체어", "MF-DR-DS1400":"FAMILY 4인 다이닝 세트", "MF-DR-BS1200":"SOCIAL 바 세트", "MF-OF-DS1200":"FOCUS 1200 워크 데스크", "MF-OF-MP400":"MOVE 이동식 서랍장", "MF-KT-PC1000":"PANTRY 1000 다용도 수납장",
  "MF-CUS-001":"맞춤 주방 캐비닛", "MF-CUS-002":"컨템포러리 레드 키친", "MF-CUS-003":"컨템포러리 옐로 키친", "MF-CUS-004":"키친 아일랜드 시스템", "MF-CUS-005":"옷장 및 대형 수납", "MF-CUS-006":"워크인 클로젯", "MF-CUS-007":"TV 월 시스템", "MF-CUS-008":"디스플레이 및 포인트 캐비닛", "MF-CUS-009":"현관 및 복도 캐비닛", "MF-CUS-010":"플로팅 캐비닛", "MF-CUS-011":"장식용 포인트 선반", "MF-CUS-012":"콤팩트 바 카운터", "MF-CUS-013":"다이닝 및 디스플레이 바", "MF-CUS-014":"거실 가구", "MF-CUS-015":"침실 가구", "MF-CUS-016":"오피스 가구", "MF-CUS-017":"호텔 가구", "MF-CUS-018":"아파트 가구", "MF-CUS-019":"상업용 가구", "MF-CUS-020":"원목 도어", "MF-CUS-021":"맞춤 도어 패널", "MF-CUS-022":"PVC 멤브레인 도어 및 패널", "MF-CUS-023":"슬라이딩 도어 및 패널 시스템", "MF-CUS-024":"단열 알루미늄 창호", "MF-CUS-025":"알루미늄 도어 및 창호 시스템", "MF-CUS-026":"프리미엄 스프링 매트리스", "MF-CUS-027":"주택 전체 맞춤 가구"
};

zhNames["MF-CUS-001"] = "豪华别墅项目 1";
zhNames["MF-CUS-002"] = "豪华别墅项目 2";
koNames["MF-CUS-001"] = "럭셔리 빌라 프로젝트 1";
koNames["MF-CUS-002"] = "럭셔리 빌라 프로젝트 2";

const categoryMap: Record<Locale, Record<string, string>> = {
  en: {},
  zh: { "Living Room":"客厅", Storage:"收纳", Bedroom:"卧室", Dining:"餐厅", "Home Office":"家庭办公", "Kitchen & Utility":"厨房与家政", Kitchens:"厨房", Living:"客厅", Hospitality:"酒店与餐饮", Furniture:"成品家具", Commercial:"商业空间", "Doors & Panels":"门与饰面板", Windows:"窗系统", Mattresses:"床垫", "Whole Home":"全屋定制" },
  ko: { "Living Room":"거실", Storage:"수납", Bedroom:"침실", Dining:"다이닝", "Home Office":"홈 오피스", "Kitchen & Utility":"주방 및 다용도", Kitchens:"주방", Living:"거실", Hospitality:"호스피탈리티", Furniture:"가구", Commercial:"상업 공간", "Doors & Panels":"도어 및 패널", Windows:"창호", Mattresses:"매트리스", "Whole Home":"주택 전체" }
};

categoryMap.zh.Residential = "住宅";
categoryMap.ko.Residential = "주거";

export type LocalizedProduct = Product & { localizedName: string; localizedCategory: string; localizedShortDescription: string; localizedDescription: string; localizedFeatures: string[]; localizedMaterials: string[]; localizedCustomers: string[]; localizedCustomization: string[]; localizedApplications: string[]; localizedPackaging: string; localizedDimensions: string };

export function localizeProduct(product: Product, locale: Locale): LocalizedProduct {
  if (locale === "en") return { ...product, localizedName: product.name, localizedCategory: product.category, localizedShortDescription: product.shortDescription, localizedDescription: product.description, localizedFeatures: product.features, localizedMaterials: product.materials, localizedCustomers: product.primaryCustomers, localizedCustomization: product.customization, localizedApplications: product.applications, localizedPackaging: product.packaging, localizedDimensions: product.dimensions };
  const name = (locale === "zh" ? zhNames : koNames)[product.code] || product.name;
  const category = categoryMap[locale][product.category] || product.category;
  const zh = locale === "zh";
  const isLaunch = product.system === "launch";
  return {
    ...product,
    localizedName: name,
    localizedCategory: category,
    localizedShortDescription: zh ? `${name}兼顾实用功能、耐用结构与适合菲律宾生活方式的清晰比例。` : `${name}은 필리핀 생활 방식에 맞춘 실용적인 기능, 견고한 구조와 균형 잡힌 비율을 제공합니다.`,
    localizedDescription: zh ? `${name}以日常使用、生产效率与长期耐用为核心设计。所有材料、饰面、数量及安装要求将在书面报价中确认。` : `${name}은 일상적인 사용성, 생산 효율성과 장기적인 내구성을 중심으로 설계되었습니다. 소재, 마감, 수량 및 설치 조건은 서면 견적에서 확정됩니다.`,
    localizedFeatures: isLaunch ? (zh ? ["针对日常使用优化的功能布局", "适合标准化生产的耐用结构", "兼顾空间效率与维护便利"] : ["일상 사용에 최적화된 기능 구성", "표준 생산에 적합한 견고한 구조", "공간 효율성과 관리 편의성 고려"]) : (zh ? ["按项目尺寸精确制造", "饰面与五金可协调选择", "可提供专业配送与安装"] : ["프로젝트 치수에 맞춘 정밀 제작", "마감 및 하드웨어 선택 가능", "전문 배송 및 설치 지원"]),
    localizedMaterials: zh ? ["按产品规格配置的板材或实木部件", "与用途匹配的五金及连接件", "经确认的耐用表面饰面"] : ["제품 사양에 맞춘 보드 또는 원목 부품", "용도에 적합한 하드웨어 및 연결 부품", "승인된 내구성 표면 마감"],
    localizedCustomers: zh ? [category + "住宅项目", "公寓与样板间", "酒店及商业项目"] : [`${category} 주거 프로젝트`, "아파트 및 쇼 유닛", "호텔 및 상업 프로젝트"],
    localizedCustomization: zh ? ["尺寸与内部布局", "颜色与表面饰面", "五金、照明与配件"] : ["치수 및 내부 구성", "색상 및 표면 마감", "하드웨어, 조명 및 액세서리"],
    localizedApplications: zh ? [category + "空间", "住宅与公寓项目", "酒店及商业室内项目"] : [`${category} 공간`, "주택 및 아파트 프로젝트", "호텔 및 상업 인테리어"],
    localizedPackaging: zh ? (product.packaging.includes("Project") ? "项目专用防护包装" : "适合运输的防护包装") : (product.packaging.includes("Project") ? "프로젝트별 보호 포장" : "운송용 보호 포장"),
    localizedDimensions: product.dimensions === "Made to project dimensions" ? (zh ? "按项目尺寸定制" : "프로젝트 치수에 맞춤 제작") : product.dimensions,
  };
}

export const localizedProducts = (locale: Locale) => products.map((product) => localizeProduct(product, locale));
export const localizedProduct = (slug: string, locale: Locale) => {
  const product = products.find((item) => item.slug === slug);
  return product ? localizeProduct(product, locale) : undefined;
};
