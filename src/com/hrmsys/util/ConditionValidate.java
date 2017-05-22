package com.hrmsys.util;
/**
 * 查询条件校验
 * @author wt
 * @date 2017-04-20
 */
public class ConditionValidate {
	
	public static boolean isEmpty(Object obj){
		if(obj == null || obj.equals("")){
			return false;
		}
		return true;
	}
	
	public static void main(String[] args) {
		System.out.println(ConditionValidate.isEmpty(""));
	}
}
