package com.hrmsys.util;

import java.io.File;

import javax.servlet.http.HttpServletRequest;


public final class FileUtil {
	 
	//获取存放文件路径
	@SuppressWarnings("unused")
	public static String getFileDir(HttpServletRequest request) {
		String path = request.getSession().getServletContext().getRealPath("/");
		String[] temppath = path.split("hrmsys");
		path = temppath[0] + File.separatorChar + "picture"+File.separatorChar + "LOL";
		File f = new File(path);
		if (!f.exists()) {
			try {
				f.mkdirs();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {

			}
		}
		return path;
	} 
    
    //递归遍历文件夹
    public static void traverseFolder2(String path) {

        File file = new File(path);
        if (file.exists()) {
            File[] files = file.listFiles();
            if (files.length == 0) {
//                System.out.println("文件夹是空的!");
                return;
            } else {
            	int i = 0;
                for (File file2 : files) {
                    if (file2.isDirectory()) {
                        traverseFolder2(file2.getAbsolutePath());
                    } else {
                    	//重命名文件
                    	if(file2.getAbsolutePath().indexOf("png") > 0) {
//                    		System.out.println("文件:" + file2.getAbsolutePath());
                    		String temp = file2.getAbsolutePath();
                    		String dest = temp.substring(0,temp.lastIndexOf('\\')+1);
                    		
                    		dest += "00" + ((++i)<10 ? "0" + i : i ) + ".png";
                    		System.out.println(dest);
                    		file2.renameTo(new File(dest));
                    	}
                    }
                }
            }
        } else {
            System.out.println("文件不存在!");
        }
    }
    
	public static void main(String[] args) {
		//创建目录
//		String dirName = "C:/Users/Administrator/Desktop/temp/社区情况调查/01 数据整理/newpoliceArrange/420102";
//		int bh = 750000;
//		for(;bh <= 750006; bh++){
//			FileUtil.createDir(dirName + String.valueOf(bh)); 
//		}
		
		//遍历重命名文件
//		FileUtil.traverseFolder2("F:\\Program Files\\Apache Software Foundation\\Tomcat 6.0\\webapps\\picture\\LOL");
//		File file=new File("http://localhost:8090/picture/LOL/0025.png");
//		 if(file.exists() && file.isFile())
//		  file.delete();
		String s = "select * from employee where emp_id like '%p%' or emp_name like '%p%' limit 0,10";
		String s1 = "123";
//		System.out.println(Integer.parseInt(s1) + "\n" + Integer.parseInt("01"));
		String jobName = "产品部";
		if(jobName.indexOf("经理") > 0){
			System.out.println(jobName + '\n' + jobName.length());
		}else{
			System.out.println(10+"0");
		}
//		ArrayList
		System.out.println(Math.max(12, 11));
	}
}
