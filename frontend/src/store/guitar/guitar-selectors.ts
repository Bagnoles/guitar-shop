import { State } from '..';
import { NameSpace } from '../../const';
import { Guitar } from '../../types/guitar.type';

export const getGuitars = (state: Pick<State, NameSpace.Guitar>): Guitar[] => state[NameSpace.Guitar].guitars.data;
export const getGuitarsLoadingStatus = (state: Pick<State, NameSpace.Guitar>): boolean => state[NameSpace.Guitar].guitars.isLoading;
export const getGuitarsErrorStatus = (state: Pick<State, NameSpace.Guitar>): boolean => state[NameSpace.Guitar].guitars.isError;
export const getGuitarInfo = (state: Pick<State, NameSpace.Guitar>): Guitar | null => state[NameSpace.Guitar].guitarInfo.data;
export const getGuitarsInfoLoadingStatus = (state: Pick<State, NameSpace.Guitar>): boolean => state[NameSpace.Guitar].guitarInfo.isLoading;
export const getGuitarsInfoErrorStatus = (state: Pick<State, NameSpace.Guitar>): boolean => state[NameSpace.Guitar].guitarInfo.isError;
