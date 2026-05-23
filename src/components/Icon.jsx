// Explicit icon map so Rollup can tree-shake lucide-react.
import {
  // Products
  Truck, Workflow, Brain, BarChart3, Receipt, MessageSquareCode, Plug,
  ShieldCheck, Wallet, Headphones,
  // Services
  Database, Map, Cloud, Code, Cpu, Shield, Leaf, Server, Link2, Smartphone,
  // Projects
  MapPin,
  // EPR
  Recycle, Scale, FileCheck, ClipboardList, Search, Award,
  // About / values
  Target, Eye, Sparkles, Users, HeartHandshake, Lightbulb,
  // Services industry
  Factory, Users2,
  // UI
  Mail, Phone, Calendar, Clock, Linkedin, Twitter, Facebook, Instagram,
  ArrowRight, Sun, Moon, Menu, X, Check, CheckCircle2, AlertCircle,
  Loader2, Send, Quote,
} from 'lucide-react';

const MAP = {
  Truck, Workflow, Brain, BarChart3, Receipt, MessageSquareCode, Plug,
  ShieldCheck, Wallet, Headphones,
  Database, Map, Cloud, Code, Cpu, Shield, Leaf, Server, Link2, Smartphone,
  MapPin,
  Recycle, Scale, FileCheck, ClipboardList, Search, Award,
  Target, Eye, Sparkles, Users, HeartHandshake, Lightbulb,
  Factory, Users2,
  Mail, Phone, Calendar, Clock, Linkedin, Twitter, Facebook, Instagram,
  ArrowRight, Sun, Moon, Menu, X, Check, CheckCircle2, AlertCircle,
  Loader2, Send, Quote,
};

export default function Icon({ name, ...rest }) {
  const Cmp = MAP[name] || Sparkles;
  return <Cmp {...rest} />;
}
